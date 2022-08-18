const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  /*
        This .render() now renders/injects Pug files to browser, similar to .sendFile does for HTML and just have to pass
        filename as arguement without .pug extension as Express will append .pug to it as we are using Pug as main
        templating engine in app.js file
  */
  const products = adminData.products;

  // Injecting pug file to browser for rendering and passing dynamic data into object as 2nd arguement to be rendered there
  res.render('shop', {
    // passing data as key:value pair with key name can be assigned any name and easier to identify
    products: products,
    docTitle: 'Shop',
    path: '/',
    isShop: true,
    // This boolean property is needed for conditional rendering in handlebars template, since the template dont handle JS codes
    // but accepts boolean values 
    hasProducts: products.length > 0,
  });
});

module.exports = router;
