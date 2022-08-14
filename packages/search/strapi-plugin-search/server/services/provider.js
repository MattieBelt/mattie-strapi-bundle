'use strict';

const { wrapMethodWithError } = require('../utils/error');
const { validateProvider, PROVIDER_METHODS } = require('../utils/validate');
const { sanitize } = require('../utils/sanitize');

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
        : await require(`@mattie-bundle/strapi-provider-search-${pluginConfig.provider}`).init(pluginConfig);

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

  /**
   * Clears and then re-populates search indexes by calling findMany on the content type
   *
   * @param {Array<string>} specificTypes - The type names to re-populate the indexes for; if null, re-populates all types; if empty, re-populates no types
   */
  async rebuild(specificTypes) {
    strapi.log.info('Rebuilding search indexes...');
    try {
      const { excludedFields = [], prefix: indexPrefix = '', contentTypes } = strapi.config.get('plugin.search');
      const pluginInstance = strapi.plugin('search').provider;
      const rebuildTypes = contentTypes.filter((contentType) => !specificTypes || specificTypes.includes(contentType.name));
      strapi.log.trace(
        `Rebuilding search indexes for ${rebuildTypes?.length || 0} types [${(rebuildTypes || []).map((type) => type.name).join(', ')}]`,
      );
      for (const contentType of rebuildTypes) {
        strapi.log.trace(`Rebuilding search index for ${contentType.name}`);
        const { name, index, prefix: idPrefix = '', fields = [] } = contentType;
        if (strapi.contentTypes[name]) {
          const indexName = indexPrefix + (index ? index : name);
          pluginInstance.clear(indexName);
          const entities = await strapi.entityService.findMany(name, {}); // Potentially expensive, TODO: paginate
          strapi.log.trace(`Rebuilding search index for ${entities.length} entities in ${contentType.name}`);
          await strapi.plugin('search').provider.createMany({
            indexName,
            data: entities.map((x) => ({
              data: sanitize(x, fields, excludedFields),
              id: idPrefix + x.id,
            })),
          });
        } else {
          strapi.log.error(`Search plugin rebuild failed: Search plugin could not rebuild index for '${name}' as it doesn't exist.`);
        }
      }
    } catch (error) {
      strapi.log.error(`Search plugin rebuild failed: ${error.message}`);
    }
  },
});
