const Product = require("../services/product.service");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { name, price, stock, categoryId } = req.body;
      const newProduct = await Product.createProduct(name, price, stock, categoryId);
      return res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.getAllProducts();
      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      const product = await Product.getProductById(id);

      if (!product) {
        const err = new Error(`Produk dengan id-${id} tidak ditemukan!`);
        err.statusCode = 404;
        throw err;
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductsByCategoryId(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const products = await Product.getProductsByCategoryId(categoryId);
      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const { name, price, stock, categoryId } = req.body;
      const product = await Product.updateProduct(id, name, price, stock, categoryId);
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      await Product.deleteProduct(id);
      return res.status(200).json({
        success: true,
        message: `Produk dengan id-${id} berhasil dihapus!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
