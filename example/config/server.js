'use strict';

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['3BVKhHFjP4HFcuT6F', '8kifS2raspbuhJ9HV']),
  },
});
