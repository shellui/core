import { cac } from 'cac';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cli = cac('shellui');

cli
  .command('start [root]', 'Start the shellui server')
  .action(async (root = '.') => {
    const cwd = process.cwd();
    const configDir = path.resolve(cwd, root);
    const configPath = path.join(configDir, 'shellui.json');
    const legacyConfigPath = path.join(configDir, 'shellioj.json');

    console.log(pc.blue(`Starting ShellUI...`));
    
    let config = {};
    let activeConfigPath = null;

    if (fs.existsSync(configPath)) {
        activeConfigPath = configPath;
    } else if (fs.existsSync(legacyConfigPath)) {
        activeConfigPath = legacyConfigPath;
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
      console.log(pc.yellow(`No shellui.json (or shellioj.json) found, using defaults.`));
    }

    // Path to the index.html inside the package
    const packageRoot = path.resolve(__dirname, '..');
    const templateRoot = path.join(__dirname); // src folder

    try {
      const server = await createServer({
        root: templateRoot, // Serve from src/ where index.html is
        plugins: [react()],
        define: {
          '__SHELLUI_CONFIG__': JSON.stringify(config),
        },
        server: {
          port: config.port || 3000,
          open: true,
          fs: {
            allow: [packageRoot, cwd]
          }
        },
      });

      await server.listen();
      server.printUrls();
    } catch (e) {
      console.error(pc.red(`Error starting server: ${e.message}`));
      process.exit(1);
    }
  });

cli.help();
cli.version('0.0.1');
cli.parse();

