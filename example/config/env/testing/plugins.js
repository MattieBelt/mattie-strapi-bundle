'use strict';

// Todo: Fix testing plugin config not being loaded.
module.exports = ({ env }) => ({
  search: {
    enabled: env.bool('SEARCH_PLUGIN', false),
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_PROVIDER_ADMIN_API_KEY'),
        applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
      },
      prefix: 'running-tests_',
      debug: true,
      contentTypes: [
        {
          uid: 'api::podcast.podcast',
          index: 'podcast',
        },
        {
          uid: 'api::episode.episode',
          index: 'episode',
          fields: ['id', 'title', 'subtitle', 'description', 'duration', 'type', 'keyWords', 'showNotes', 'podcast', 'hosts', 'quests'],
        },
        {
          uid: 'api::category.category',
        },
        {
          uid: 'api::unknown.contentType',
        },
      ],
    },
  },
});
