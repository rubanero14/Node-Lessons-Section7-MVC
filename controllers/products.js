/**
 * Bringing and consolidation all products related middleware logics which routes section needs
 * into products controller file and then later to be imported into relevant files that needed the data and logic
 * here inside this controller for their use
 */

// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        isProduct: true,
    })
}

exports.postAddNewProductPage = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.adminProducts = (req, res, next) => {
    res.render('admin/products', {
        docTitle: 'Admin Products',
        path: '/admin/products',
    });
};

exports.getProductsPage = (req, res, next) => { 
    // const products = await Product.fetchAll(); 
    // // Injecting pug file to browser for rendering and passing dynamic data into object as 2nd arguement to be rendered there
    // res.render('shop', {
    //     // passing data as key:value pair with key name can be assigned any name and easier to identify
    //     products: products,
    //     docTitle: 'Shop',
    //     path: '/',
    //     isShop: true,
    //     // This boolean property is needed for conditional rendering in handlebars template, since the template dont handle JS codes
    //     // but accepts boolean values 
    //     hasProducts: products.length > 0,
    // });

    // since we are getting products array from models/products.js in the callback function below therefore we dont need to declare
    // products variable as above
    Product.fetchAll( products => {
        res.render('shop/product-list', {
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
    
    exports.cart = (req, res, next) => {
        res.render('cart', {
            docTitle: 'Cart',
            path: '/cart',
        });
    };

    exports.products = (req, res, next) => {
        res.render('products', {
            docTitle: 'Products',
            path: '/products',
        });
    };
  }