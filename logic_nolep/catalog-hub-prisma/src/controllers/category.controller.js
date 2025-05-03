const Category = require("../services/category.service");

class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const name = req.body.name;
      const newCategory = await Category.createCategory(name);
      return res.status(201).json({
        success: true,
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.getAllCategories();
      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.getCategoryById(id);

      if (!category) {
        const error = new Error(`Kategori dengan id-${id} tidak ditemukan!`);
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      const category = await Category.updateCategory(id, name);
      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      await Category.deleteCategory(id);
      return res.status(200).json({
        success: true,
        message: `Kategori dengan id-${id} berhasil dihapus!`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
