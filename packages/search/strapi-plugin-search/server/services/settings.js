'use strict';

const { mergeWith, assign, uniqBy } = require('lodash/fp');
const { getConfig } = require('../utils/helpers');

const defaultStoreSettings = {
  prefix: strapi.config.environment + '_',
  excludedFields: ['createdBy', 'updatedBy'],
  debug: false,
  contentTypes: [],
};

const getStore = () => {
  return strapi.store({
    type: 'plugin',
    name: 'search',
    key: 'settings',
  });
};

const mergeArrayUnique = (objValue, srcValue) => {
  // TODO: generalize
  if (Array.isArray(objValue) || Array.isArray(srcValue)) {
    return uniqBy([].concat(srcValue, objValue), 'uid');
  }
};

/**
 * Gets settings service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  async getSettings() {
    const store = getStore();

    const settings = await store.get();

    if (!settings) {
      await this.setSettings(defaultStoreSettings);
      assign(settings, defaultStoreSettings);
    }

    return mergeWith(settings, getConfig(), mergeArrayUnique);
  },

  async setSettings(settings) {
    await getStore().set({ value: settings });

    return mergeWith(settings, getConfig(), mergeArrayUnique);
  },

  async getContentTypeByUid(uid, settings = this.getSettings()) {
    const index = await this.getContentTypeIndexByUid(uid, settings);
    const { contentTypes } = await settings;

    if(uid && contentTypes && index >= 0 ) {
      return contentTypes[index];
    }

    return null;
  },

  async getContentTypeIndexByUid(uid, settings = this.getSettings()) {
    const { contentTypes } = await settings;

    if (uid && contentTypes) {
      return contentTypes.findIndex((item) => item.uid === uid);
    }

    return null;
  },

  async addOrUpdateContentType(contentType) {
    // Todo: Validate body/content type

    const settings = await this.getSettings();

    if (settings.contentTypes) {
      const index = await this.getContentTypeIndexByUid(contentType.uid, settings);
      if(index >= 0) {
        settings.contentTypes[index] = contentType;
      } else {
        settings.contentTypes.push(contentType);
      }
    } else {
      settings.contentTypes = [contentType];
    }

    return this.setSettings(settings);
  },

  async removeContentType(contentType) {
    const settings = await this.getSettings();

    if (settings.contentTypes) {
      const index = await this.getContentTypeIndexByUid(contentType.uid, settings);
      if(index >= 0) {
        delete settings.contentTypes[index];
      }
    } else {
      settings.contentTypes = [];
    }

    return this.setSettings(settings);
  },


});
