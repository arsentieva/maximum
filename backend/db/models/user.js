"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      bio: DataTypes.TEXT,
      image: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Story, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
    User.hasMany(models.Follow, { foreignKey: "followedId" });
    User.hasMany(models.Follow, { foreignKey: "followerId" });

    const columnStoryClapMapping = {
      through: "StoryClap",
      foreignKey: "userId",
      otherKey: "storyId",
    };
    const columnCommentClapMapping = {
      through: "CommentClap",
      foreignKey: "userId",
      otherKey: "commentId",
    };
    User.belongsToMany(models.Story, columnStoryClapMapping);
    User.belongsToMany(models.Comment, columnCommentClapMapping);
  };
  User.prototype.validatePassword = function (password) {
    // Note that since this function is a model instance method,
    // `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  return User;
};
