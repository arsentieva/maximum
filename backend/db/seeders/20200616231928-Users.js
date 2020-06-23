'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        bio: 'I am the Co-Owner and CEO of Generic People of America!',
        image: '',
        email: 'john.doe@averagepeople.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      },
      {
        name: 'Jane Doe',
        bio: 'I am the Co-Owner and CEO of Generic People of America!',
        image: '',
        email: 'jane.doe@averagepeople.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      },
      {
        name: 'Brenda',
        bio: 'I am an interior designer in Washington D.C.!',
        image: '',
        email: 'bobbert@soaps4you.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      },
      {
        name: 'Jack Greedy',
        bio: 'I like stuff. Stuff likes me. Give me your stuff!',
        image: '',
        email: 'jack.greey@allmystuff.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      },
      {
        name: 'John Cho',
        bio: '',
        image: '',
        email: 'john.cho@chomo.org',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      },
      {
        name: 'Demo',
        bio: 'I am a real person!',
        image: '',
        email: 'demo@isdemo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        hashedPassword: '$2a$10$E6VPqs5DtbdXyI3FIUzVnuu35jjJzxgGUUu2Z5WAtLDEFa12jRzvq'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
