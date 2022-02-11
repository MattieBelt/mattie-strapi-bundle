'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/settings/content-types',
      handler: 'settings.addOrUpdateContentType',
    },
    {
      method: 'PUT',
      path: '/settings/content-types/:uid/sync',
      handler: 'settings.syncContentType',
    },
    {
      method: 'DELETE',
      path: '/settings/content-types/:uid',
      handler: 'settings.deleteContentType',
    },
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
    },
  ],
};
