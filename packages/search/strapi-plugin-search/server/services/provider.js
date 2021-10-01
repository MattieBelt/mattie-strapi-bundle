'use strict';

const { wrapMethodWithError } = require('../utils/error');
const { validateProvider, PROVIDER_METHODS } = require('../utils/validate');

/**
 * Gets provider service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  /**
   * Loads provider
   *
   * @param {object} pluginConfig - Plugin configuration
   * @param {string} [pluginConfig.provider] - Provider name
   * @param {object} [pluginConfig.instance] - Provider instance
   * @param {Function} pluginConfig.instance.init - Initiation function of provider instance
   */
  async loadProvider(pluginConfig) {
    pluginConfig = pluginConfig ? pluginConfig : strapi.config.get('plugin.search');

    try {
      // Todo implement v4 package loader logic
      const providerInstance = pluginConfig.instance
        ? pluginConfig.instance
        : await require(`strapi-provider-search-${pluginConfig.provider}`).init(pluginConfig);

      if (validateProvider(providerInstance)) {
        PROVIDER_METHODS.forEach((method) => {
          providerInstance[method] = wrapMethodWithError(providerInstance[method]);
        });
        strapi.plugin('search').provider = providerInstance;
      }
    } catch (error) {
      strapi.plugin('search').provider = null;
      throw new Error(`Search plugin could not load provider '${pluginConfig.provider}': ${error.message}`);
    }
  },
});
