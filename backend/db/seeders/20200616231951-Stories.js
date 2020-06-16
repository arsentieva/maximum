'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      {
        title: 'It Ain\'t Easy Being Generic',
        byline: 'The story and struggle of being America\'s average man',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      },
      {
        title: 'Ice Cream is Great!',
        byline: 'Frozen Treats are the best in Summer Heats!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      },
      {
        title: 'Things Average People Love To Do',
        byline: 'All average things average people love doing!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
