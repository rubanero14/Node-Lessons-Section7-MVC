require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const pageNotFoundController = require("./controllers/404");
const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

// MongoDB related codes
const mongoConnect = require("./util/database").mongoConnect;

// // Sequelize DB related codes
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const app = express();
// EJS Template Engine Section
/*
    Telling Express JS to use EJS as templating engine,
    Telling Express to find and use HTML templates inside the views folder, in the case of the templates stored in different
    folder name, change the second arguement passed in the app.set() as the name of the folder:
    e.g.: app.set('views','templates') if the templates stored inside 'templates' folder 
*/
app.set("view engine", "ejs");
app.set("views", "views");

// Initiate and use middlewares here
app.use(bodyParser.urlencoded({ extended: false }));

// Registering generic middleware to enable User data to be used anywhere in the app upon any incoming requests
app.use((req, res, next) => {
  // Sequelize DB related codes
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; // storing user data as JSON object inside global Request object under key name 'user', which is created if its not exist
  //     next(); // forward to next middleware
  //   })
  //   .catch((err) => console.log(err));

  // MongoDB related codes
  next();
});

// using outsourced routes from admin.js/shop.js into app.js
app.use("/admin", adminRoutes);
// app.use(shopRoutes);

/* 
    This middleware enables serving static files eg: main.css files to browser.
    Basically, granting read access to the browser on the folder name passed in as the arguement below
*/
app.use(express.static(path.join(__dirname, "public")));

// middleware for catching all routes not registered/used and display error 404 message to browser
app.use(pageNotFoundController.notFoundPage);

// //******* DATABASE ASSOCIATIONS *******//
// // Relation setup for Product with User model for User owned product or listed his/her product for Sequelize
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });

// // Relation setup for 1 User has many Products
// User.hasMany(Product);

// // Cart/Order related associations
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });
// //******** END CODE *********//

// // This code using .sync() translates the model I have defined in database model section in JS object, into SQL table
// // NOTE: Middleware only runs when there is an incoming request, as for the other functions such as sequelize config below will be run only during 'npm start'
// sequelize
//   // .sync({ force: true }) // This will enforce changes of the relational setups into existing tables involved if set to true [Development only, avoid setup force to true in Production]
//   .sync()
//   .then(() => {
//     return User.findByPk(1); // returning here enables forwards to another then block below [Best practice to avoid nested callbacks]
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "Raj",
//         email: "test@email.com",
//       });
//     }
//     return user;
//   })
//   .then((user) => {
//     // Create cart for the particular user globally
//     return user.createCart();
//   })
//   .then((cart) => {
//     // console.log(result);
//     // Listen to server short-hand
//     // console.log(user.toJSON()); // .toJSON() method enables stringified data shown as JSON object without other metadatas from sequelize
//     app.listen(PORT);
//     console.log(`Server online at http://localhost:${PORT}`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// MongoDB related codes
mongoConnect(() =>
  app.listen(PORT, () =>
    console.log(`Server online at http://localhost:${PORT}`)
  )
);
