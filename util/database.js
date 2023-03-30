const { Sequelize } = require("sequelize");

// This area is database connection setup
// Sequelize constructor takes in 4 args, where it includes database schema name, database id and password and the last args is an object with relevant configs
const sequelize = new Sequelize("node-lesson", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
