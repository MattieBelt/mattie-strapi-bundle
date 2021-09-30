module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/people',
      handler: 'person.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/people/:id',
      handler: 'person.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/people',
      handler: 'person.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/people/:id',
      handler: 'person.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/people/:id',
      handler: 'person.delete',
      config: {
        policies: [],
      },
    },
  ],
};
