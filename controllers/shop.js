/**
 * Bringing and consolidation all products related middleware logics which routes section needs
 * into products controller file and then later to be imported into relevant files that needed the data and logic
 * here inside this controller for their use
 */

// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProductsPage = (req, res, next) => {
  // since we are getting products array from models/products.js in the callback function below therefore we dont need to declare
  // products variable as above
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        // passing data as key:value pair with key name can be assigned any name and easier to identify
        products: products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Using conditional statement with .findAll()
  // Product.findAll({
  //   where: {
  //     id: productId,
  //   },
  // })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       docTitle: products[0].title,
  //       path: `/products`,
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Using .findByPk()
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: `/products`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) =>
      cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            docTitle: "Your Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
