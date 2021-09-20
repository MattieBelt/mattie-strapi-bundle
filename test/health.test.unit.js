'use strict';

const request = require('supertest');

describe('Strapi', function() {
  test('Strapi should be defined', () => {
    expect(strapi).toBeDefined();
  });

  test('GET /_health should return [204 NO CONTENT]', (done) => {
    request(strapi.server.httpServer)
      .get('/_health')
      .expect(204, done);
  });
});
