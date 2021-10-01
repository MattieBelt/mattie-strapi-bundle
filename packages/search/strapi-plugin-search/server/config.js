'use strict';

const { validateConfig } = require('./utils/validate');

module.exports = {
  /**
   * Default plugin configuration
   */
  default: {
    prefix: strapi.config.environment + '_',
    excludedFields: ['createdBy', 'updatedBy'],
    debug: false,
  },

  /**
   * Validates plugin configuration
   *
   * @param {object} config - Plugin configuration
   * @returns {object} Configuration validator
   */
  validator: (config) => validateConfig(config),
};
