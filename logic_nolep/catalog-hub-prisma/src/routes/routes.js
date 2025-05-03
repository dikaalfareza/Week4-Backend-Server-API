const express = require("express");
const router = express.Router();

const categoryRoute = require("./category.route");
const productRoute = require("./product.route");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);

module.exports = router;
