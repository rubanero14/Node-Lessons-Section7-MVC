const express = require('express');

const router = express.Router();

// Initiate global variable to store and pass data across middleware/routes
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        isProduct: true,
    })
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title,
    })
    res.redirect('/');
});

// Exporting this module to other files
module.exports = {
    routes: router,
    products: products,
}