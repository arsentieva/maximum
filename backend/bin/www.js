const { port } = require("../config/index");

const app = require("../app");
const db = require("../db/models");

const myPort = Number.parseInt(port, 10) || 8085;

// Check the database connection before starting the app.
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    // Start listening for connections.
    app.listen(myPort, () => console.log(`Listening on port ${myPort}...`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });
