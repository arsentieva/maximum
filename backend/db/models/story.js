'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    byline: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Story.associate = function (models) {
    // associations can be defined here
    Story.belongsTo(models.User, { foreignKey: 'userId' });
    Story.hasMany(models.Comment, { foreignKey: 'storyId' });
  };
  return Story;
};
