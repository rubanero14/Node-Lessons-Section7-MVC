// MongoDB related codes
const mongodb = require("mongodb");
const getDatabase = require("../util/database").getDatabase;
let userExist;

class User {
  constructor(username, email, cart, userId) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = userId;
  }

  save() {
    const db = getDatabase();

    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIdx = this.cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIdx >= 0) {
      newQuantity = this.cart.items[cartProductIdx].quantity + 1;
      updatedCartItems[cartProductIdx].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updateCart = {
      items: updatedCartItems,
    };
    const db = getDatabase();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
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
