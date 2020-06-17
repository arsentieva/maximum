'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        bio: 'I am the Co-Owner and CEO of Generic People of America!',
        image: 'https://miro.medium.com/max/240/0*WK_vAxJo4O7Kdq3j.png',
        email: 'john.doe@averagepeople.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$T1nqebhGDqucWZetgJSxsO2YVDTqc9Wt2JVELqtVNreZtoYcYMfgW'
      },
      {
        name: 'Jane Doe',
        bio: 'I am the Co-Owner and CEO of Generic People of America!',
        image: 'https://miro.medium.com/max/240/0*WK_vAxJo4O7Kdq3j.png',
        email: 'jane.doe@averagepeople.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$GpU/UD3c5p5f4yyLFUkBh.IE5a9Lu.EaUAHH1a9n4bG8M67NeZo2a'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
