'use strict';

const bootstrap = require('./server/bootstrap');
const config = require('./server/config');
const services = require('./server/services');

/**
 * @returns {object} Plugin server object
 */
module.exports = () => ({
  bootstrap,
  config,
  services,
});
