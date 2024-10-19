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
const mongoConnect = (cb) => {
  return mongoClient
    .connect(connectionUri)
    .then((result) => {
      console.log("Mongo cluster connected...");
      cb(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
