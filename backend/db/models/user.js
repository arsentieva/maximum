"use strict";
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
    User.hasMany(models.Story, { foreignKey: 'userId' })
  };
  return User;
};
