'use strict';

const { createStrapiInstance } = require('./helpers/strapi');

let instance;
beforeAll(async () => {
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
