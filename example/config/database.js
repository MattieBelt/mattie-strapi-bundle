'use strict';

const path = require('path');

module.exports = ({ env }) => {
  const connections = {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', './.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    postgres: {
      client: 'postgres',
      connection: {
        database: 'strapi',
        user: 'strapi',
        password: 'strapi',
        port: 5432,
        host: 'localhost',
      },
    },
    mysql: {
      client: 'mysql',
      connection: {
        database: 'strapi',
        user: 'strapi',
        password: 'strapi',
        port: 3306,
        host: 'localhost',
      },
    },
  };

  return { connection: connections[env('DATABASE', 'sqlite')] || connections.sqlite };
};
