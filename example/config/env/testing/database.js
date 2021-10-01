'use strict';

const path = require('path');

module.exports = {
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '../../..', './.tmp/test.db'),
    },
    useNullAsDefault: true,
  },
};
