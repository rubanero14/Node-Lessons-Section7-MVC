const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProductPage);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddNewProductPage);

// // /admin/edit-product => GET
router.get("/edit-product/:productId", adminController.getEditProductPage);

// // /admin/products => GET
router.get("/products", adminController.getProducts);

// // /admin/products => POST
router.post("/edit-product/:productId", adminController.postEditProductPage);

// /admin/delete-product => POST
router.post("/delete-product", adminController.postDeleteProduct);

// Exporting this module to other files
module.exports = router;
