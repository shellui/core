import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import pc from 'picocolors';
import { loadConfig, getCoreSrcPath, createViteDefine, resolvePackagePath } from '../utils/index.js';

/**
 * Start command - Starts the ShellUI development server
 * @param {string} root - Root directory (default: '.')
 */
export async function startCommand(root = '.') {
  const cwd = process.cwd();
  
  console.log(pc.blue(`Starting ShellUI...`));
  
  // Load configuration
  const config = loadConfig(root);
  
  // Get core package paths
  const corePackagePath = resolvePackagePath('@shellui/core');
  const coreSrcPath = getCoreSrcPath();

  try {
    const server = await createServer({
      root: coreSrcPath,
      plugins: [react()],
      define: createViteDefine(config),
      server: {
        port: config.port || 3000,
        open: true,
        fs: {
          allow: [corePackagePath, cwd]
        }
      },
    });

    await server.listen();
    server.printUrls();
  } catch (e) {
    console.error(pc.red(`Error starting server: ${e.message}`));
    process.exit(1);
  }
}

