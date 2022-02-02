'use strict';

/**
 * Gets a plugin's config
 *
 * @returns {object} - Plugin's Service
 */
const getConfig = () => {
  return strapi.config.get('plugin.search');
};

/**
 * Gets a plugin's service
 *
 * @param {string} name - Service name
 * @returns {object} - Plugin's Service
 */
const getService = (name) => {
  return strapi.plugin('search').service(name);
};


module.exports = {
  getConfig,
  getService,
};
