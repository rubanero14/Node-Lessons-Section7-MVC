// MongoDB related codes
const mongodb = require("mongodb");
const getDatabase = require("../util/database").getDatabase;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id);
  }

  /**
   * Save Product to Database
   *
   * A product class method which saves created product into database
   */
  save() {
    const db = getDatabase();

    // Update existing product
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    // Saving new product
    return db
      .collection("products")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  static fetchAllProducts() {
    const db = getDatabase();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  // MongoDB related codes
  static fetchProduct(id) {
    const db = getDatabase();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(`${id}`) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
}

// // Sequelize DB related codes
// const Sequelize = require("sequelize");

// // importing database connection pool
// const sequelize = require("../util/database");

// // Initializing database model for Product, with model name normally is lowercase in naming convention
// // model is defined by using .define() where it takes 2 args, model name and structure of the model defined inside JS object
// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
