const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const validateCategoryName = require("../middlewares/validateCategoryName");

router
  .route("/")
  .post(validateCategoryName, CategoryController.createCategory)
  .get(CategoryController.getAllCategories);

router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .put(validateCategoryName, CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = router;
