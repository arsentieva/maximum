'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        body: 'I like Apples and Bananas!',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 1,
        userId: 1,
      },
      {
        body: 'I like Ice Cream',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 2,
        userId: 1,
      },
      {
        body: 'You Tell \'em!',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 3,
        userId: 2,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
