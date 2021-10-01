'use strict';

/**
 * Bootstraps search plugin
 */
module.exports = async () => {
  const search = strapi.plugin('search');

  try {
    const store = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'store',
    });

    await search.service('provider').loadProvider();

    // Todo: use store to save plugin config.
    await store.set({
      key: 'config',
      value: {},
    });

    await search.service('lifecycle').loadLifecycleMethods();
  } catch (error) {
    strapi.log.error(`Search plugin bootstrap failed. ${error.message}`);
  }
};
