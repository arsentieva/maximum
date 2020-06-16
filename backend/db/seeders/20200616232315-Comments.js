'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        body: 'I like Apples and Bananas!',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 4,
        userId: 4,
      },
      {
        body: 'I like Ice Cream',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 5,
        userId: 4,
      },
      {
        body: 'You Tell \'em!',
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 6,
        userId: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
