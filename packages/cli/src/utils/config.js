import path from 'path';
import fs from 'fs';
import pc from 'picocolors';

/**
 * Load configuration from shellui.json file
 * @param {string} root - Root directory to search for config (default: current working directory)
 * @returns {Object} Configuration object
 */
export function loadConfig(root = '.') {
  const cwd = process.cwd();
  const configDir = path.resolve(cwd, root);
  const configPath = path.join(configDir, 'shellui.json');

  let config = {};
  let activeConfigPath = null;

  if (fs.existsSync(configPath)) {
    activeConfigPath = configPath;
  }

  if (activeConfigPath) {
    try {
      const configFile = fs.readFileSync(activeConfigPath, 'utf-8');
      config = JSON.parse(configFile);
      console.log(pc.green(`Loaded config from ${activeConfigPath}`));
    } catch (e) {
      console.error(pc.red(`Failed to load config: ${e.message}`));
    }
  } else {
    console.log(pc.yellow(`No shellui.json found, using defaults.`));
  }

  return config;
}

