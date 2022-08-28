const fs = require('fs');
const path = require('path');
const root = require('../util/path');

// Initially empty array initialized to store user input data here, now replaced with file-system storage
// const products = [];

const fileName = path.join(root, 'data', 'products.json');

// Create a helper function to reuse code below
const getProductsFromFile = (cb) => {
    // read the file contents and export it as JS object data
    fs.readFile(fileName, (error, content) => {
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
    constructor(title){
        // to access variable inside class, include this keyword
        this.title = title;
    }

    save(){
        getProductsFromFile(products => {
            // add new changes in user input data into products variable
            products.push(this);
            
            // convert JS object into JSON and store into file 
            fs.writeFile(fileName, JSON.stringify(products), (error) => {
                console.log(error);
            });
        })
        // to access the whole object/class as an variable, use this keyword
        // products.push(this);

        // Initiating file-system storage for user input data
        // Constructing path across all OS for storing the intiated file
        // const fileName = path.join(root, 'data', 'products.json');

        // in order to store data into the file, first we need to read the file
        // fs.readFile(fileName, (error, content) => {
            // initiate empty array to store temp data
            // let products = [];
            
            // If no error, read and store the contents of the file into products variable
            // if(!error && content.length > 0){
            //     products = JSON.parse(content);
            // }

            // add new changes in user input data into products variable
            // products.push(this);
            
            // convert JS object into JSON and store into file 
        //     fs.writeFile(fileName, JSON.stringify(products), (error) => {
        //         console.log(error);
        //     });
        // });
    }

    // since fs is async code, we need to pass a cb or anonymous fn to return promises in the form of product
    // this is work-around solution since earlier templates not receiving products array and returned undefined in templates
    // with this, we guarantee, the templates will receive products array as promised
    static fetchAll(customCallBack){
        getProductsFromFile(customCallBack);
    }
}