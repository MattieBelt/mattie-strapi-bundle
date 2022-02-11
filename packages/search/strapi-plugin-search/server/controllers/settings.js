'use strict';

const { getService, getContentTypes } = require('../utils/helpers');

/**
 * Gets settings service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  async getSettings(ctx) {
    const settings = await getService('settings').getSettings();
    const contentTypes = getContentTypes();

    ctx.send({ contentTypes, settings });
  },

  async addOrUpdateContentType(ctx) {
    const { contentType, skipSyncing = false } = ctx.request.body;

    if(!skipSyncing) {
      contentType.stats = await getService('search').syncIndex(contentType);
    }

    const settings = await getService('settings').addOrUpdateContentType(contentType);

    ctx.send({ settings });
  },

  async syncContentType(ctx) {
    const { uid } = ctx.request.params;

    const contentType = await getService('settings').getContentTypeByUid(uid);

    // if(contentType) {
      const stats = await getService('search').syncIndex(contentType);
      const settings = await getService('settings').addOrUpdateContentType({ ...contentType, stats });
    // } else {
      // Todo: Throw 404
    // }

    console.log(settings);


    ctx.send({ settings });
  },

  async deleteContentType(ctx) {
    const { uid } = ctx.request.params;
    const { skipDeletingIndex = false } = ctx.request.body;

    const contentType = await getService('settings').getContentTypeByUid(uid);
    const settings = await getService('settings').removeContentType(contentType);

    if(!skipDeletingIndex) {
      // await getService('index').delete(contentType);
    }

    ctx.send({ settings });
  },
});
