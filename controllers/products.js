/**
 * Bringing and consolidation all products related middleware logics which routes section needs
 * into products controller file and then later to be imported into relevant files that needed the data and logic
 * here inside this controller for their use
 */

// Initiate global variable to store and pass data across middleware/routes
const products = [];

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        isProduct: true,
    })
}

exports.postAddNewProductPage = (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title,
    })
    res.redirect('/');
}

exports.getProductsPage = (req, res, next) => {  
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
  }