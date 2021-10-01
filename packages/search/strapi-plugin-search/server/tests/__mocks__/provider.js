'use strict';

module.exports = {
  /**
   * Initiates the mock search provider
   *
   * @returns {object} - Mock search provider
   */
  init() {
    return {
      client: {},
      create: () => {},
      update: null,
      delete: true,
      createMany: {},
      // updateMany: null,
      // deleteMany: () => {},
    };
  },
};
