'use strict';

const { yup } = require('@strapi/utils');

const PROVIDER_METHODS = ['create', 'update', 'delete', 'createMany', 'updateMany', 'deleteMany', 'clear'];

/**
 * Validates plugin configuration
 *
 * @param {object} config - Plugin configuration
 */
const validateConfig = (config) => {
  try {
    yup
      .object()
      .shape({
        provider: yup.string().required(),
        providerOptions: yup.object(),
        prefix: yup.string(),
        excludedFields: yup.array().of(yup.string().required()),
        debug: yup.boolean(),
        contentTypes: yup.array().of(
          yup.object().shape({
            name: yup.string().required(),
            index: yup.string(),
            fields: yup.array().of(yup.string().required()),
          }),
        ),
      })
      .validateSync(config);
  } catch (error) {
    throw new Error(`Search plugin ConfigValidationError: ${error.errors}`);
  }
};

// Todo: move function to provider service if function keeps simple.
/**
 * Validates search provider
 *
 * @param {object} provider - Search Provider
 * @returns {boolean} - True
 */
const validateProvider = (provider) => {
  PROVIDER_METHODS.forEach((method) => {
    if (!(method in provider) || !(typeof provider[method] === 'function')) {
      throw new Error(`Provider validation Error: Required method '${method}' isn't implemented in the provider.`);
    }
  });

  return true;
};

module.exports = {
  PROVIDER_METHODS,
  validateConfig,
  validateProvider,
  yup,
};
