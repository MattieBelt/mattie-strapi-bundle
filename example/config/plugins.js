'use strict';

module.exports = ({ env }) => ({
  search: {
    enabled: env.bool('ALGOLIA_PROVIDER', false),
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_PROVIDER_API_KEY'),
        applicationId: env('ALGOLIA_PROVIDER_APPLICATION_ID'),
      },
      prefix: `${env('NODE_ENV', 'development')}-example_`,
      excludedFields: ['createdAt', 'createdBy', 'updatedBy'],
      debug: env.bool('DEBUG', false),
      contentTypes: [
        {
          name: 'api::podcast.podcast',
          index: 'podcast',
        },
        {
          name: 'api::episode.episode',
          index: 'episode',
          fields: ['id', 'title', 'subtitle', 'description', 'duration', 'type', 'keyWords', 'showNotes', 'podcast', 'hosts', 'quests'],
        },
        {
          name: 'api::category.category',
        },
      ],
    },
  },
});
