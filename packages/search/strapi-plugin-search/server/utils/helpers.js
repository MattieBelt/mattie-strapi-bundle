'use strict';

const { pick } = require('lodash/fp');

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

/**
 * Gets a array of content types
 *
 * @returns {object} - Content types
 */
const getContentTypes = () => {
  return Object.keys(strapi.contentTypes).map((key) => {
    return pick(['uid', 'info', 'kind', 'attributes'], strapi.contentTypes[key]);
  });
};


module.exports = {
  getConfig,
  getContentTypes,
  getService,
};
