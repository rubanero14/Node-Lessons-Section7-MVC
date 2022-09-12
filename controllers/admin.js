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
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('admin/products', {
          products: products,
          docTitle: 'Admin Products',
          path: '/admin/products',
        });
    });
};