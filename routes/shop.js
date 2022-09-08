const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// Registering Home page route
router.get("/", productsController.getProductsPage);

// Registering Cart page route
router.get("/cart");

// Registering Products page route
router.get("/products");

// Registering Checkout page route
router.get("/checkout");

module.exports = router;
