const fs = require('fs');
const path = require('path');
const root = require('../util/path');

const basePath =  path.join(
    root,
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(basePath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0};

            if(!err){
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            
            // Add new product/quantity
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1,
                }
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(basePath, JSON.stringify(cart), err => console.log(err));
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(basePath, (err, fileContent) => {
            if(err) return;

            const cart = JSON.parse(fileContent);
            // Find product to delete
            const deleteProductIndex = cart.products.findIndex(product => product.id === id);
            // Remove price from total price belongs to that product
            const updatedTotalPrice = cart.totalPrice - (cart.products[deleteProductIndex].qty * +productPrice);
            
            // Delete product from card
            const updatedCart = {products : [...cart.products.filter(product => product.id !== id)], totalPrice: updatedTotalPrice};

            fs.writeFile(basePath, JSON.stringify(updatedCart), err => console.log(err));
        })
    }

    static getCart(callback){
        fs.readFile(basePath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                callback(null)
            } else {
                callback(cart);
            }
        });
    }
}