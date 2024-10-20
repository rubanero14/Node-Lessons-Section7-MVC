// MongoDB related codes
const mongoConnect = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  /**
   * Save Product to Database
   *
   * A product class method which saves created product into database
   */
  save() {}
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
