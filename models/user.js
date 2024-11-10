// MongoDB related codes
const mongodb = require("mongodb");
const getDatabase = require("../util/database").getDatabase;
let userExist;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDatabase();

    return db.collection("users").insertOne(this);
  }

  static findUserById(userId) {
    const db = getDatabase();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

// // Sequelize DB related codes
// const Sequelize = require("sequelize");

// // importing database connection pool
// const sequelize = require("../util/database");

// // User model
// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = User;
