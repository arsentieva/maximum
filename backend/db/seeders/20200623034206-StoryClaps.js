'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StoryClaps', [
      {
        storyId: 1,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 2,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 4,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 1,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 6,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 8,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 9,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 12,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 2,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 3,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 4,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 7,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 12,
      },
      {
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 2,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 12,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 11,
      },
      {
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 7,
      },
      {
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 1,
      },
      {
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 5,
      },
      {
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 6,
      },
      {
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 8,
      },
      {
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 12,
      },
      {
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 1,
      },
      {
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 7,
      },
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 2,
      },
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 8,
      },
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        storyId: 9,
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StoryClaps', null, {});
  }
};
