'use strict';

const { unlinkSync, existsSync } = require('fs');
const path = require('path');
const strapi = require('@strapi/strapi');

const APP_PATH = path.resolve(__dirname, '../../example');

/**
 * @returns {strapi} Strapi instance
 */
const createStrapiInstance = async () => {
  const instance = strapi({ dir: APP_PATH });

  await instance.load();

  instance.log.level = 1;

  instance.server.mount();

  instance.http = instance.server.httpServer;

  return instance;
};

/**
 * Deletes the test sqlite database.
 */
const removeTestDatabase = () => {
  const databasePath = path.join(APP_PATH, `./.tmp/test-${process.env.JEST_WORKER_ID}.db`);

  if (existsSync(databasePath)) {
    unlinkSync(databasePath);
  }
};

module.exports = {
  createStrapiInstance,
  removeTestDatabase,
};
