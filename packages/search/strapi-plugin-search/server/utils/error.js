'use strict';

/**
 * Wraps function with search plugin error message for strapi logger.
 *
 * @param {Function} fn - Function
 * @returns {Function} Function wrapped with Search plugin error message
 */
const wrapMethodWithError = (fn) => (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    strapi.log.error(`Search plugin: ${error.message}`);
  }
};

module.exports = {
  wrapMethodWithError,
};
