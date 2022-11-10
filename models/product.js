const fs = require('fs');
const path = require('path');
const root = require('../util/path');
const Cart = require('./cart');

// Initially empty array initialized to store user input data here, now replaced with file-system storage
// const products = [];

const productJSON = path.join(root, 'data', 'products.json');
const cartJSON = path.join(root, 'data', 'cart.json');

// Create a helper function to reuse code below
const getProductsFromFile = (cb) => {
    // read the file contents and export it as JS object data
    fs.readFile(productJSON, (error, content) => {
        if(error && content.length < 1){
            // return [];
            return cb([]);
        }
        // return JSON.parse(content);
        return cb(JSON.parse(content));
    });
    // to access variable outside class, omit this keyword
    // return products;
};

// Structure and export this model as reusable class
module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        // to access variable inside class, include this keyword
        this.id = +id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = +price;
    }

    save(){
        getProductsFromFile(products => {
            // console.log("this.id: ",this.id)
            if(this.id) {
                const existingProductIndex =  products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this; // this keyword refer to newly created product object via class Product constructor above

                fs.writeFile(productJSON, JSON.stringify(updatedProducts), (error) => {
                    console.log(error);
                });
            } else {
                console.log(products.length);
                this.id = products.length + 1;
                // add new changes in user input data into products variable
                products.push(this);
                // convert JS object into JSON and store into file 
                fs.writeFile(productJSON, JSON.stringify(products), (error) => {
                    console.log(error);
                });
            }
        })
        // to access the whole object/class as an variable, use this keyword
        // products.push(this);

        // Initiating file-system storage for user input data
        // Constructing path across all OS for storing the intiated file
        // const productJSON = path.join(root, 'data', 'products.json');

        // in order to store data into the file, first we need to read the file
        // fs.readFile(productJSON, (error, content) => {
            // initiate empty array to store temp data
            // let products = [];
            
            // If no error, read and store the contents of the file into products variable
            // if(!error && content.length > 0){
            //     products = JSON.parse(content);
            // }

            // add new changes in user input data into products variable
            // products.push(this);
            
            // convert JS object into JSON and store into file 
        //     fs.writeFile(productJSON, JSON.stringify(products), (error) => {
        //         console.log(error);
        //     });
        // });
    };

    // since fs is async code, we need to pass a cb or anonymous fn to return promises in the form of product
    // this is work-around solution since earlier templates not receiving products array and returned undefined in templates
    // with this, we guarantee, the templates will receive products array as promised
    static fetchAll(customCallBack){
        getProductsFromFile(customCallBack);
    };

    static findById(id, customCallBack){
        getProductsFromFile(products => {
            const product = products.find(product => product.id === +id);
            customCallBack(product);
        });
    };

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(product => product.id === +id);
            // console.log(products)
            // using filter method to delete and return new array with filtered products
            const updatedProducts = products.filter(product => product.id !== +id);
            fs.writeFile(productJSON, JSON.stringify(updatedProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }
}