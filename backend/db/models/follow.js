'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      type: DataTypes.INTEGER,
    },
    followedId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Follow.associate = function (models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: 'followedId' });
    Follow.belongsTo(models.User, { foreignKey: 'followerId' });
  };
  return Follow;
};
