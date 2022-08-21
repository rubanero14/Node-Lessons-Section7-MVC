const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundController = require('./controllers/404')

// EJS Template Engine Section
/*
    Telling Express JS to use EJS as templating engine
*/
app.set('view engine','ejs');

/* 
    Telling Express to find and use HTML templates inside the views folder, in the case of the templates stored in different
    folder name, change the second arguement passed in the app.set() as the name of the folder:
    e.g.: app.set('views','templates') if the templates stored inside 'templates' folder 
*/
app.set('views','views');

// Initiate and use middlewares here
app.use(bodyParser.urlencoded({extended: false}));

// using outsourced routes from admin.js/shop.js into app.js
app.use('/admin', adminRoutes);
app.use(shopRoutes);

/* 
    This middleware enables serving static files eg: main.css files to browser.
    Basically, granting read access to the browser on the folder name passed in as the arguement below
*/
app.use(express.static(path.join(__dirname, 'public')))


// middleware for catching all routes not registered/used and display error 404 message to browser
app.use(pageNotFoundController.notFoundPage);

// Listen to server short-hand
app.listen(PORT);
console.log(`Server online at http://localhost:${PORT}`);