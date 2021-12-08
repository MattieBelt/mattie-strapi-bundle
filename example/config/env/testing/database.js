'use strict';

const path = require('path');

module.exports = {
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '../../..', `./.tmp/test-${process.env.JEST_WORKER_ID}.db`),
    },
    useNullAsDefault: true,
  },
};
