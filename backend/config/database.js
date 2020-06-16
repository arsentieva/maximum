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
    dialect: "postgres",
    use_env_variable: "HEROKU_POSTGRESQL_GRAY_URL",
  },
};