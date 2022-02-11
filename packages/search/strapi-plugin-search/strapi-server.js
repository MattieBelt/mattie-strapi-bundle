'use strict';

const bootstrap = require('./server/bootstrap');
const config = require('./server/config');
const controllers = require('./server/controllers');
const routes = require('./server/routes');
const services = require('./server/services');

/**
 * @returns {object} Plugin server object
 */
module.exports = () => ({
  bootstrap,
  config,
  controllers,
  routes,
  services,
});
