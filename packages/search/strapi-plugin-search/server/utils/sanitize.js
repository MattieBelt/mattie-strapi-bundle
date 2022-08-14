'use strict';

const { omit, pick } = require('lodash/fp');

/**
 * Sanitizes the data object by picking the specific fields or omit the specific excluded fields.
 *
 * @param {Object} entity - the entity to sanitize
 * @param {Array<string>} fields - the fields to pick from the entity
 * @param {Array<string>} excludedFields - the fields to omit from the entity
 * @returns {Object} - sanitized result
 */
const sanitize = (entity, fields, excludedFields) => {
  if (fields.length > 0) {
    return pick(fields, entity);
  }

  return omit(excludedFields, entity);
};

module.exports = { sanitize };
