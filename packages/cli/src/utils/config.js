import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load configuration from shellui.config.ts or shellui.json file
 * Prefers TypeScript config over JSON config
 * @param {string} root - Root directory to search for config (default: current working directory)
 * @returns {Promise<Object>} Configuration object
 */
export async function loadConfig(root = '.') {
  const cwd = process.cwd();
  const configDir = path.resolve(cwd, root);
  const tsConfigPath = path.join(configDir, 'shellui.config.ts');
  const jsonConfigPath = path.join(configDir, 'shellui.config.json');

  let config = {};
  let activeConfigPath = null;
  let isTypeScript = false;

  // Prefer TypeScript config over JSON
  if (fs.existsSync(tsConfigPath)) {
    activeConfigPath = tsConfigPath;
    isTypeScript = true;
  } else if (fs.existsSync(jsonConfigPath)) {
    activeConfigPath = jsonConfigPath;
    isTypeScript = false;
  }

  if (activeConfigPath) {
    try {
      if (isTypeScript) {
        // Load TypeScript config using tsx CLI via child process
        // This avoids module cycle issues with dynamic registration
        // Use file URL for the import to ensure proper resolution
        const configFileUrl = pathToFileURL(activeConfigPath).href;
        const loaderScript = `
          import config from ${JSON.stringify(configFileUrl)};
          const result = config.default || config.config || config;
          console.log(JSON.stringify(result));
        `;
        
        // Write temporary script to load the config
        const tempScriptPath = path.join(configDir, '.shellui-config-loader.mjs');
        fs.writeFileSync(tempScriptPath, loaderScript);
        
        try {
          // Find tsx - try to resolve it from node_modules
          const { createRequire } = await import('module');
          const require = createRequire(import.meta.url);
          
          let tsxPath;
          try {
            // Try to resolve tsx package
            const tsxPackagePath = require.resolve('tsx/package.json');
            const tsxPackageDir = path.dirname(tsxPackagePath);
            tsxPath = path.join(tsxPackageDir, 'dist/cli.mjs');
            
            if (!fs.existsSync(tsxPath)) {
              throw new Error('tsx CLI not found');
            }
          } catch (resolveError) {
            // Fallback to npx if tsx not found
            tsxPath = null;
          }
          
          // Execute tsx to run the loader script
          const result = await new Promise((resolve, reject) => {
            const useNpx = !tsxPath;
            const command = useNpx ? 'npx' : 'node';
            const args = useNpx 
              ? ['-y', 'tsx', tempScriptPath]
              : [tsxPath, tempScriptPath];
            
            const child = spawn(command, args, {
              cwd: configDir,
              stdio: ['ignore', 'pipe', 'pipe'],
              env: process.env
            });
            
            let stdout = '';
            let stderr = '';
            
            child.stdout.on('data', (data) => {
              stdout += data.toString();
            });
            
            child.stderr.on('data', (data) => {
              stderr += data.toString();
            });
            
            child.on('close', (code) => {
              if (code !== 0) {
                reject(new Error(`Failed to load TypeScript config: ${stderr || `Process exited with code ${code}`}`));
              } else {
                try {
                  const parsed = JSON.parse(stdout.trim());
                  resolve(parsed);
                } catch (parseError) {
                  reject(new Error(`Failed to parse config output: ${parseError.message}\nOutput: ${stdout}\nStderr: ${stderr}`));
                }
              }
            });
            
            child.on('error', (error) => {
              reject(new Error(`Failed to execute tsx: ${error.message}`));
            });
          });
          
          config = result;
          
          // Clean up temp script
          if (fs.existsSync(tempScriptPath)) {
            fs.unlinkSync(tempScriptPath);
          }
          
          console.log(pc.green(`Loaded TypeScript config from ${activeConfigPath}`));
        } catch (execError) {
          // Clean up temp script on error
          if (fs.existsSync(tempScriptPath)) {
            try {
              fs.unlinkSync(tempScriptPath);
            } catch (e) {
              // Ignore cleanup errors
            }
          }
          throw execError;
        }
      } else {
        // Load JSON config
        const configFile = fs.readFileSync(activeConfigPath, 'utf-8');
        config = JSON.parse(configFile);
        console.log(pc.green(`Loaded JSON config from ${activeConfigPath}`));
      }
    } catch (e) {
      console.error(pc.red(`Failed to load config from ${activeConfigPath}: ${e.message}`));
      if (e.stack) {
        console.error(pc.red(e.stack));
      }
    }
  } else {
    console.log(pc.yellow(`No shellui.config.ts or shellui.json found, using defaults.`));
  }

  return config;
}

