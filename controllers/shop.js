/**
 * Bringing and consolidation all products related middleware logics which routes section needs
 * into products controller file and then later to be imported into relevant files that needed the data and logic
 * here inside this controller for their use
 */

// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require('../models/product');

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
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            // passing data as key:value pair with key name can be assigned any name and easier to identify
            products: products,
            docTitle: 'All Products',
            path: '/products',
        //   isShop: true,
        //   // This boolean property is needed for conditional rendering in handlebars template, since the template dont handle JS codes
        //   // but accepts boolean values 
        //   hasProducts: products.length > 0,
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        console.log(product);
    });
    res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/index', {
            products: products,
            docTitle: 'Shop',
            path: '/',
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path: '/cart',
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout',
    });
};