// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    })
}

exports.postAddNewProductPage = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProductPage = (req, res, next) => {
    // check/verify for query parameters exist using Express's req.query helper here
    const editMode = req.query.edit;
    console.log(req.query.edit)
    if(!editMode) return res.redirect('/');

    const prodId = req.params.productId;
    
    Product.findById(prodId, product => {
        if(!product) return res.redirect('/');
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        })
    });
}

exports.postEditProductPage = (req, res, next) => {
    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products')
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

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
};