const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// Registering Home page route
router.get("/", shopController.getIndex);

// // Registering Cart page route
// router.get("/cart", shopController.getCart);

// // Registering Cart page route
// router.post("/cart", shopController.postCart);

// // Registering Cart Delete Item page route
// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// // Registering Orders page route
// router.get("/orders", shopController.getOrders);

// // Registering Create Orders page route
// router.post("/create-order", shopController.postOrder);

// Registering Products page route
router.get("/products", shopController.getProductsPage);

// Registering get Product Details page route
router.get("/products/:productId", shopController.getProduct);

// // Registering Checkout page route
// router.get("/checkout", shopController.getCheckout);

module.exports = router;
