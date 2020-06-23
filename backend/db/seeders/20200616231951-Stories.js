'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      {
        title: 'Loneliness in the Age of Social Media',
        byline: 'At a time when we\'re more connected than ever, isolation can feel all the more defeating',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 12),
        updatedAt: new Date(),
        userId: 1
      },
      {
        title: 'How to Reorganize Your Room Through Meditation',
        byline: 'Michael Scott wasn\'t too far off—a clean desk starts with a clean mind',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 20),
        updatedAt: new Date(),
        userId: 3
      },
      {
        title: 'Things Average People Love To Do',
        byline: 'All average things average people love doing!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 2),
        updatedAt: new Date(),
        userId: 2
      },
      {
        title: 'Can America\'s Aging Power Grids Keep Up with Wind and Solar Power?',
        byline: 'Some cities are considering paying people to use more electricity at night',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 5, 12),
        updatedAt: new Date(),
        userId: 4
      },
      {
        title: 'Asking for Help Isn\'t a Sign of Weakness',
        byline: 'The biggest mistake I made as a junior developer was not looking to my elders for guidance',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 4),
        updatedAt: new Date(),
        userId: 5
      },
      {
        title: 'What I Learned From \'Running Up That Hill\': Philosophy & Kate Bush',
        byline: 'You don\'t need a deal with God to understand your partner\'s needs',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 21),
        updatedAt: new Date(),
        userId: 6
      },
      {
        title: 'Practice Doesn\'t Always Make Perfect',
        byline: 'Not all practice is productive—here\'s how to make the best of your time using the "50-50 rule"!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 18),
        updatedAt: new Date(),
        userId: 1
      },
      {
        title: 'Confessions of a So-Called \'Ambivert\'',
        byline: 'By using conventional definitions, no one falls neatly in either category',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 5, 14),
        updatedAt: new Date(),
        userId: 2
      },
      {
        title: 'Is Your Disaster Plan as Foolproof as Possible?',
        byline: 'I\'d be willing to bet money it\'s not',
        body: 'Lorem ipsum dolor sit amet, consectetur blaze adipiscing elit, eet sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 4, 20),
        updatedAt: new Date(),
        userId: 3
      },
      {
        title: 'What Quarantine Revealed About Internet Addiction',
        byline: 'Please help! There\'s a pair of legs stuck in my computer!',
        body: 'Lorem ipsum dolor sit amet, niiice consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 6, 9),
        updatedAt: new Date(),
        userId: 4
      },
      {
        title: 'How To Keep Your Travel Blog Alive in The Age of Social Distancing',
        byline: 'Spoiler: it involves outright lying to your audience',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 4, 12),
        updatedAt: new Date(),
        userId: 5
      },
      {
        title: 'It\'s Worse Than it Looks: Observations from COVID-19\'s Front Lines',
        byline: 'What New York Times, CNN, and Reuters hasn\'t been showing you from healthcare professionals',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Tellus elementum sagittis vitae et. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Nibh tortor id aliquet lectus. Scelerisque mauris pellentesque pulvinar pellentesque. Nisi scelerisque eu ultrices vitae auctor eu augue. Netus et malesuada fames ac turpis egestas. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tristique sollicitudin nibh sit amet commodo nulla. Enim diam vulputate ut pharetra sit amet. Habitant morbi tristique senectus et netus.',
        image: 'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/888/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg',
        createdAt: new Date(2020, 5, 15),
        updatedAt: new Date(),
        userId: 6
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
