'use strict';

const { isObject } = require('lodash/fp');

/**
 * Deeply map all object keys with lodash
 *
 * @param {object} object - Object
 * @returns {Array} - Object keys
 */
const deeplyKeys = (object) => {
  const keys = [];
  if (!object && !isObject(object)) {
    return {};
  }

  for (const [key, value] of Object.entries(object)) {
    
  }


  return strapi.config.get('plugin.search');
};


module.exports = {
  deeplyMap: deeplyKeys,
};
