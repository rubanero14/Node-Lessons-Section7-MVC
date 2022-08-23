const products = [];

module.exports = class Product {
    constructor(title){
        // to access variable inside class, include this keyword
        this.title = title;
    }

    save(){
        // to access the whole object/class as an variable, use this keyword
        products.push(this);
    }

    static fetchAll(){
        // to access variable outside class, omit this keyword
        return products;
    }
}