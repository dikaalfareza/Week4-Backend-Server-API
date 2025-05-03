const prisma = require("../../prisma/client");

class Category {
  static async createCategory(name) {
    try {
      const newCategory = await prisma.category.create({ data: { name: name } });
      return newCategory;
    } catch (error) {
      throw new Error("Gagal membuat kategori baru!");
    }
  }

  static async getAllCategories() {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products: true,
        },
      });
      return categories;
    } catch (error) {
      throw new Error("Gagal mendapatkan semua data kategori!");
    }
  }

  static async getCategoryById(id) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: { products: true },
      });
      return category;
    } catch (error) {
      throw new Error(`Gagal mendapatkan kategory dengan id-${id}`);
    }
  }

  static async updateCategory(id, name) {
    try {
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name: name },
      });
      return category;
    } catch (error) {
      if (error.code === "P2025") {
        const err = new Error(`Kategori dengan id-${id} tidak ditemukan!`);
        err.statusCode = 404;
        throw err;
      }
      throw new Error(`Gagal mengupdate kategory dengan id-${id}`);
    }
  }

  static async deleteCategory(id) {
    try {
      await prisma.category.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error.code === "P2025") {
        const err = new Error(`Kategori dengan id-${id} tidak ditemukan!`);
        err.statusCode = 404;
        throw err;
      }
      throw new Error(`Gagal menghapus kategory dengan id-${id}`);
    }
  }
}

module.exports = Category;
