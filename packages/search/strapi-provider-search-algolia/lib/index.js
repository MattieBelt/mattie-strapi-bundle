'use strict';

/**
 * @typedef {object} Provider
 * @property {algoliasearch.SearchClient} client - Algoliasearch client
 * @property {Function} create - Creates the entity in the index
 * @property {Function} update - Updates the entity in the index
 * @property {Function} delete - Deletes the entity in the index
 * @property {Function} createMany - Creates multiple entities in the index
 * @property {Function} updateMany - Updates multiple entities in the index
 * @property {Function} deleteMany - Deletes multiple entities in the index
 */

const algoliasearch = require('algoliasearch');

module.exports = {
  /**
   * Initiates the algolia search provider
   *
   * @param {object} pluginConfig - Plugin configuration
   * @returns {Provider} Algolia search provider
   */
  async init(pluginConfig) {
    const {
      providerOptions: { applicationId = '', apiKey = '' },
      debug,
    } = pluginConfig;

    if (!applicationId.length || !apiKey.length) {
      throw new Error('Algolia provider could not initialize: `applicationId` and `apiKey` must be defined on `providerOptions`.');
    }

    const client = algoliasearch(applicationId, apiKey);

    await client.getApiKey(apiKey, { timeout: 3000 }).catch((error) => {
      throw new Error(`Algolia provider could not initialize: ${error.message}`);
    });

    return {
      /**
       * Algoliasearch Client
       *
       * @type {algoliasearch.SearchClient};
       */
      client,

      /**
       * Creates the entity on a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {object} params.data - Data of the to be created entry
       * @param {string} [params.id] - Id used for identification of the entry
       * @returns {Promise<algoliasearch.SaveObjectResponse>} Promise with save task
       */
      create({ indexName, data, id }) {
        return client
          .initIndex(indexName)
          .saveObject({ objectID: id || data.id, ...data })
          .then(() => debug && strapi.log.debug(`Algolia provider: Created entry with objectID '${id || data.id}' on index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Updates the entity on a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {object} params.data - Data of the to be updated entry
       * @param {string} [params.id] - Id used for identification of the entry
       * @returns {Promise<algoliasearch.PartialUpdateObjectResponse>} Promise with update task
       */
      update({ indexName, data, id }) {
        return client
          .initIndex(indexName)
          .partialUpdateObject({ objectID: id || data.id, ...data }, { createIfNotExists: true })
          .then(() => debug && strapi.log.debug(`Algolia provider: Updated entry with objectID '${id || data.id}' on index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Deletes the entity from a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {string} params.id - Id used for identification of the entry
       * @returns {Promise<algoliasearch.DeleteResponse>} Promise with delete task
       */
      delete({ indexName, id }) {
        return client
          .initIndex(indexName)
          .deleteObject(id)
          .then(() => debug && strapi.log.debug(`Algolia provider: Delete entry with objectID '${id}' from index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Creates multiple entities on a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {Array<{data: object, id: string|undefined}>} params.data - Data of the to be created entries
       * @returns {Promise<algoliasearch.ChunkedBatchResponse>} Promise with chunked task
       */
      createMany({ indexName, data }) {
        data = data.map((entry) => ({ objectID: entry.id, ...entry }));

        return client
          .initIndex(indexName)
          .saveObjects(data)
          .then(() => debug && strapi.log.debug(`Algolia provider: Created ${data.length} entries on index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Updates multiple entities on a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {Array<{data: object, id: string|undefined}>} params.data - Data of the to be updated entries
       * @returns {Promise<algoliasearch.ChunkedBatchResponse>} Promise with chunked task
       */
      updateMany({ indexName, data }) {
        data = data.map((entry) => ({ objectID: entry.id, ...entry }));

        return client
          .initIndex(indexName)
          .partialUpdateObjects(data, { createIfNotExists: true })
          .then(() => debug && strapi.log.debug(`Algolia provider: Updated ${data.length} entries on index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Deletes multiple entities from a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @param {Array<string>} params.ids - Ids used for identification of the entries
       * @returns {Promise<algoliasearch.ChunkedBatchResponse>} Promise with chunked task
       */
      deleteMany({ indexName, ids }) {
        return client
          .initIndex(indexName)
          .deleteObjects(ids)
          .then(() => debug && strapi.log.debug(`Algolia provider: Deleted ${ids.length} entries from index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },

      /**
       * Clears all entities from a index
       *
       * @param {object} params - Paramaters
       * @param {string} params.indexName - Name of the index
       * @returns {Promise<algoliasearch.ChunkedBatchResponse>} Promise with chunked task
       */
      clear({ indexName }) {
        return client
          .initIndex(indexName)
          .clearObjects()
          .then(() => debug && strapi.log.debug(`Algolia provider: Cleared all entries from index '${indexName}'.`))
          .catch((error) => {
            throw new Error(`Algolia provider: ${error.message}`);
          });
      },
    };
  },
};
