const { username, password, database, host } = require("./index").db;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
  },
  production: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
};
