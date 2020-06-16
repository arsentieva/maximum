'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentClap = sequelize.define('CommentClap', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  CommentClap.associate = function(models) {
    // associations can be defined here

  };
  return CommentClap;
};
