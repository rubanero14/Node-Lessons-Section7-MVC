const db = require("../util/database");
const Cart = require("./cart");

// Structure and export this model as reusable class
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    // to access variable inside class, include this keyword
    this.id = +id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = +price;
  }

  save() {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, customCallBack) {}

  static deleteById(id) {}
};
