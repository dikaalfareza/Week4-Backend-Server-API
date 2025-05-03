const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const validateProductFields = require("../middlewares/validateProductFIelds");

router.route("/").post(validateProductFields, ProductController.createProduct).get(ProductController.getAllProducts);

router.get("/categories/:categoryId", ProductController.getProductsByCategoryId);

router
  .route("/:id")
  .get(ProductController.getProductById)
  .put(validateProductFields, ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

module.exports = router;
