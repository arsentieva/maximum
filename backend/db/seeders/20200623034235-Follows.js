'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Follows', [
      {
        followerId: 1,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 2,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 3,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 4,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 5,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 6,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 6,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 6,
        followedId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Follows', null, {});
  }
};
