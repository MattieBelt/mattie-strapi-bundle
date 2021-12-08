'use strict';

const { createStrapiInstance, removeTestDatabase } = require('./helpers/strapi');

let instance;
beforeAll(async () => {
  removeTestDatabase();
  instance = await createStrapiInstance();
});

Object.defineProperty(global, 'strapi', {
  get() {
    return instance;
  },
  set(value) {
    instance = value;
  },
});
