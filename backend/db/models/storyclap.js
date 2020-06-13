'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryClap = sequelize.define('StoryClap', {
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  StoryClap.associate = function (models) {
    // associations can be defined here
  };
  return StoryClap;
};
