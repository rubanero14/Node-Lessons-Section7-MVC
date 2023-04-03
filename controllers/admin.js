// Initiate global variable to store and pass data across middleware/routes
// const products = [];

const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddNewProductPage = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
    })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getEditProductPage = (req, res, next) => {
  // check/verify for query parameters exist using Express's req.query helper here
  const editMode = req.query.edit;
  //console.log(req.query.edit)
  if (!editMode) return res.redirect("/");

  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProductPage = async (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.update({
        title: updatedTitle,
        price: updatedPrice,
        imageUrl: updatedImageUrl,
        description: updatedDesc,
      });
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
