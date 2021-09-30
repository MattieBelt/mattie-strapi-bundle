'use strict';

/**
 * Wraps function with search plugin error message.
 *
 * @param {Function} fn - Function
 * @returns {Function} Function wrapped with Search plugin error message
 */
const wrapMethodWithError = (fn) => (...args) => {
  if (typeof fn !== 'function') {
    throw new Error(`One of the required methods isn't of the type 'function', but of type '${typeof fn}'.`);
  }

  try {
    return fn(...args);
  } catch (error) {
    strapi.log.error(`Search plugin: ${error.message}`);
  }
};

module.exports = {
  wrapMethodWithError,
};
