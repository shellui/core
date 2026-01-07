/**
 * ShellUI SDK
 * 
 * JavaScript SDK for ShellUI integration
 */

/**
 * Initialize ShellUI SDK
 * @param {Object} config - Configuration options
 * @returns {Object} SDK instance
 */
export function init(config = {}) {
  return {
    version: '0.0.1',
    config,
    // Add SDK methods here
  };
}

/**
 * Get ShellUI version
 * @returns {string} Version string
 */
export function getVersion() {
  return '0.0.1';
}

export default {
  init,
  getVersion,
};

