'use strict';

const { validateConfig } = require('./utils/validate');

module.exports = {
  /**
   * Default plugin configuration
   */
  default: {},

  /**
   * Validates plugin configuration
   *
   * @param {object} config - Plugin configuration
   * @returns {object} Configuration validator
   */
  validator: (config) => validateConfig(config),
};
