require("dotenv").config();
// // Sequelize DB related codes
// const { Sequelize } = require("sequelize");

// // This area is database connection setup
// // Sequelize constructor takes in 4 args, where it includes database schema name, database id and password and the last args is an object with relevant configs
// const sequelize = new Sequelize("node-lesson", "root", "1234", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// MongoDB related codes
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const connectionUri = process.env.MONGO_DB_CONNECTION;
let dbConnection;

// Returns mongodb connection and storing the connection to the database
const mongoConnect = (fn) => {
  return mongoClient
    .connect(connectionUri)
    .then((client) => {
      console.log("Mongo cluster connected...");

      // DB connection to mongodb
      dbConnection = client.db();
      fn(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// Returns access to connected database if it exists
const getDatabase = () => {
  if (dbConnection) {
    return dbConnection ;
  }

  throw "No database found.";
};

module.exports = { mongoConnect, getDatabase };
