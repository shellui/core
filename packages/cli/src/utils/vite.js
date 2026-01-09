import path from 'path';
import { resolvePackagePath } from './index.js';

/**
 * Get the path to the core package source directory
 * @returns {string} Absolute path to core package src directory
 */
export function getCoreSrcPath() {
  const corePackagePath = resolvePackagePath('@shellui/core');
  return path.join(corePackagePath, 'src');
}

/**
 * Create Vite define configuration for ShellUI config injection
 * @param {Object} config - Configuration object
 * @returns {Object} Vite define configuration
 */
export function createViteDefine(config) {
  // Ensure config is serializable and has proper structure
  const serializableConfig = JSON.parse(JSON.stringify(config));
  
  return {
    '__SHELLUI_CONFIG__': JSON.stringify(serializableConfig),
  };
}

