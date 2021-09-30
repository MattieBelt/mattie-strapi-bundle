module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/podcasts',
      handler: 'podcast.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/podcasts/:id',
      handler: 'podcast.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/podcasts',
      handler: 'podcast.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/podcasts/:id',
      handler: 'podcast.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/podcasts/:id',
      handler: 'podcast.delete',
      config: {
        policies: [],
      },
    },
  ],
};
