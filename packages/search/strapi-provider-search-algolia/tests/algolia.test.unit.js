'use strict';

const { categories } = require('./__mocks__/categories');

describe('Algolia provider', function () {
  jest.setTimeout(20000);

  test('Algolia provider should be initialized', async () => {
    expect(strapi.plugin('search').provider).toEqual(
      expect.objectContaining({
        client: expect.any(Object),
        create: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
        createMany: expect.any(Function),
        updateMany: expect.any(Function),
        deleteMany: expect.any(Function),
      }),
    );

    for (const category of categories) {
      await strapi.plugin('search').provider.create({ indexName: 'category', data: category });
      await strapi.plugin('search').provider.update({ indexName: 'category', data: category });
      await strapi.plugin('search').provider.delete({ indexName: 'category', id: category.id });
    }
    await strapi.plugin('search').provider.createMany({ indexName: 'category', data: categories });
    await strapi.plugin('search').provider.updateMany({ indexName: 'category', data: categories });
    await strapi.plugin('search').provider.deleteMany({ indexName: 'category', ids: categories.map((category) => category.id) });

    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    await Promise.allSettled([
      strapi.plugin('search').provider.create({ indexName: '', data: categories[0] }),
      strapi.plugin('search').provider.update({ indexName: '', data: categories[0] }),
      strapi.plugin('search').provider.delete({ indexName: '', data: categories[0].id }),
      strapi.plugin('search').provider.createMany({ indexName: '', data: categories }),
      strapi.plugin('search').provider.updateMany({ indexName: '', data: categories }),
      strapi.plugin('search').provider.deleteMany({ indexName: '', ids: categories.map((category) => category.id) }),
    ]).then((results) => results.forEach((result) => expect(result.value).toBeUndefined()));
  });

  test('Algolia provider should fail initialing', () => {
    return expect(
      strapi
        .plugin('search')
        .service('provider')
        .loadProvider({
          provider: 'algolia',
          providerOptions: {
            apiKey: 'ALGOLIA_PROVIDER_ADMIN_API_KEY',
            applicationId: 'ALGOLIA_PROVIDER_APPLICATION_ID',
          },
        }),
    ).rejects.toThrow();
  });
});
