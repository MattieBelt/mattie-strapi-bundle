'use strict';

const path = require('path');
const strapi = require('@strapi/strapi');

const APP_URL = path.resolve(__dirname, '../../example');

/**
 * @returns {strapi} Strapi instance
 */
const createStrapiInstance = async () => {
  const instance = strapi({ dir: APP_URL });

  await instance.load();

  instance.log.level = 1;

  instance.server.mount();

  instance.http = instance.server.httpServer;

  return instance;
};

module.exports = {
  createStrapiInstance,
};
