const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;

const pageNotFoundController = require("./controllers/404");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

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

// using outsourced routes from admin.js/shop.js into app.js
app.use("/admin", adminRoutes);
app.use(shopRoutes);

/* 
    This middleware enables serving static files eg: main.css files to browser.
    Basically, granting read access to the browser on the folder name passed in as the arguement below
*/
app.use(express.static(path.join(__dirname, "public")));

// middleware for catching all routes not registered/used and display error 404 message to browser
app.use(pageNotFoundController.notFoundPage);

// Relation setup for Product with User model for User owned product or listed his/her product
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

// Relation setup for 1 User has many Products
User.hasMany(Product);

// This code using .sync() translates the model I have defined in database model section in JS object, into SQL table
sequelize
  .sync({ force: true }) // This will enforce changes of the relational setups into existing tables involved if set to true [Development only, avoid setup force to true in Production]
  .then(() => {
    // console.log(result);
    // Listen to server short-hand
    app.listen(PORT);
    console.log(`Server online at http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });
