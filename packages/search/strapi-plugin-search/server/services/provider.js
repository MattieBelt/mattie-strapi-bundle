'use strict';

const { wrapMethodWithError } = require('../utils/error');
const { validateProvider, PROVIDER_METHODS } = require('../utils/validate');

/**
 * Gets provider service
 *
 * @returns {object} - Provider service
 */
module.exports = () => ({
  /**
   * Loads provider
   */
  async loadProvider() {
    const pluginConfig = strapi.config.get('plugin.search');

    try {
      // Todo implement v4 package loader logic
      const providerPackage = require(`strapi-provider-search-${pluginConfig.provider}`);
      const providerInstance = await providerPackage.init(pluginConfig);

      if (validateProvider(providerInstance)) {
        PROVIDER_METHODS.forEach((method) => {
          providerInstance[method] = wrapMethodWithError(providerInstance[method]);
        });
        strapi.plugin('search').provider = providerInstance;
      }
    } catch (error) {
      throw new Error(`Search plugin could not load provider '${pluginConfig.provider}': ${error.message}`);
    }
  },
});
