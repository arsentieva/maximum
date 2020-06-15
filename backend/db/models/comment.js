"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Story, { foreignKey: "storyId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    const columnMapping = {
      through: "CommentClap",
      foreignKey: "commentId",
      otherKey: "userId",
    };
    Comment.belongsToMany(models.User, columnMapping);
  };
  return Comment;
};
