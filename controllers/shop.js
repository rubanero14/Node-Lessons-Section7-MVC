/**
 * Bringing and consolidation all products related middleware logics which routes section needs
 * into products controller file and then later to be imported into relevant files that needed the data and logic
 * here inside this controller for their use
 */

// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require("../models/product");

exports.getProductsPage = (req, res, next) => {
  // since we are getting products array from models/products.js in the callback function below therefore we dont need to declare
  // products variable as above

  // // Sequelize DB related codes
  // Product.findAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       // passing data as key:value pair with key name can be assigned any name and easier to identify
  //       products: products,
  //       docTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => console.log(error));

  // MongoDB related codes
  Product.fetchAllProducts()
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
  // MongoDB related codes
  Product.fetchProduct(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));

  // // Sequelize DB related codes
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
  // Product.findByPk(productId)
  //   .then((product) => {
  //     res.render("shop/product-detail", {
  //       product: product,
  //       docTitle: product.title,
  //       path: `/products`,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  // // Sequelize DB related codes
  // Product.findAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       // passing data as key:value pair with key name can be assigned any name and easier to identify
  //       products: products,
  //       docTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => console.log(error));

  // MongoDB related codes
  Product.fetchAllProducts()
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
  // Global variable to be accessed by all .then() blocks
  let fetchedCart;
  // Setting default quantity to 1
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      // to check if this product already exist in the cart
      fetchedCart = cart; // to enable other .then() methods to access the fetched cart not only in this .then() method
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      // retrieve the product in cart if exist
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        // if product exist, increase by 1
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }

      // if no product found, add new one from Product db
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      // to delete the product from cart item table
      return product.cartItem.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Orders",
    path: "/orders",
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    // Get access to the cart
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      // Get access to the products
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        // Updating orderItem quantity data same as cartItem quantity data and ship it to order
        return order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
          })
        );
      });
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then(() => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "Ypur Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
