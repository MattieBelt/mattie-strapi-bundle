'use strict';

const { getConfig } = require('../utils/helpers');

const BATCH_LIMIT = 1000;

/**
 * Gets settings service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  async deleteIndex(contentType) {
    const provider = strapi.plugin('search').provider;

  },

  async syncIndex(contentType) {
    const provider = strapi.plugin('search').provider;

    // Todo, extract sanitizing to util function
    const { excludedFields = [], prefix: indexPrefix = '' } = getConfig();
    const { uid, index, prefix: idPrefix = '', fields = [] } = contentType;

    const indexName = indexPrefix + (index ? index : uid);

    await provider.clear({ indexName });

    const promises = [];
    const totalCount = await strapi.entityService.count(contentType.uid);

    let indexCount = 0;

    while(totalCount > indexCount) {

      // Todo: Make limit configurable
      promises.push(strapi.entityService.findMany(contentType.uid, { start: indexCount, limit: BATCH_LIMIT })
        .then((entries) => {
          return provider.updateMany({ indexName, data: entries });
        }));

      indexCount += BATCH_LIMIT;
    }

    return Promise.all(promises)
      .then(() => ({ indexedCount: totalCount, totalCount }));
  },
});
