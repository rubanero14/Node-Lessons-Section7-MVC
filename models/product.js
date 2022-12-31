const db = require("../util/database");
const Cart = require("./cart");

// Structure and export this model as reusable class
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    // to access variable inside class, include this keyword
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = +price;
  }

  // Save new data into DB
  save() {
    /*
        1. Using ? replacing the values in VALUES () is to avoid SQL injection, adding extra layer of protection
        2. execute() takes in 2 params, where first is SQL query string and the second one is Array of dynamic data we wish to inject or save matching the table columns
        3. Reminder the 2nd param into execute() must be an Array, to bind the values into the table
    */
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  // Get all from DB
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, customCallBack) {}

  static deleteById(id) {}
};
