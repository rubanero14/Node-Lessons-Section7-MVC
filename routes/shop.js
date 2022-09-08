const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// Registering Home page route
router.get("/", shopController.getIndex);

// Registering Cart page route
router.get("/cart", shopController.getCart);

// Registering Products page route
router.get("/products", shopController.getProductsPage);

// Registering Checkout page route
router.get("/checkout", shopController.getCheckout);

module.exports = router;
