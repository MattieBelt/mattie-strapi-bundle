'use strict';

const { PROVIDER_METHODS } = require('../utils/validate');
const { categories, episode } = require('./__mocks__/data');

describe('Search plugin', function() {
  beforeAll(async () => {
    for (let [index, category] of categories.entries()) {
      category = await strapi.entityService.create('api::category.category', { data: category });
      categories[index] = category;
    }
    await strapi.entityService.update('api::category.category', categories[0].id, { data: categories[0] });
    await strapi.entityService.delete('api::category.category', categories[1].id);

    await strapi.entityService.create('api::episode.episode', { data: episode });
  });

  test('Search provider should be initialized with PROVIDER_METHODS', () => {
    PROVIDER_METHODS.forEach((method) => {
      expect(strapi.plugin('search').provider).toHaveProperty(method);
    });
  });

  test('Search provider should not be initialized', async () => {
    return await strapi
      .plugin('search')
      .service('provider')
      .loadProvider({
        provider: 'algolia',
        providerOptions: {},
      })
      .catch(() => {
        expect(strapi.plugin('search').provider).toBeNull();
      });
  });

  test('Mock provider should not be initialized', async () => {
    return expect(
      strapi
        .plugin('search')
        .service('provider')
        .loadProvider({
          instance: require('./__mocks__/provider').init(),
        }),
    ).rejects.toThrow();
  });
});
