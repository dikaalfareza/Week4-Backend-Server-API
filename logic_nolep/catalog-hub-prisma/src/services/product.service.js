const prisma = require("../../prisma/client");

class Product {
  static async createProduct(name, price, stock, categoryId) {
    try {
      const newProduct = await prisma.product.create({
        data: {
          name: name,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
        },
      });
      return newProduct;
    } catch (error) {
      throw new Error("Gagal membuat produk baru!");
    }
  }

  static async getAllProducts() {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return products;
    } catch (error) {
      throw new Error("Gagal mendapatkan semua data produk!");
    }
  }

  static async getProductById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return product;
    } catch (error) {
      throw new Error(`Gagal mendapatakan produk dengan id-${id}`);
    }
  }

  static async getProductsByCategoryId(categoryId) {
    try {
      const products = await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
      });
      return products;
    } catch (error) {
      throw new Error(`Gagal mendapatkan data produk dengan kategori id-${categoryId}`);
    }
  }

  static async updateProduct(id, name, price, stock, categoryId) {
    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name: name,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
        },
      });
      return product;
    } catch (error) {
      if (error.code === "P2025") {
        const err = new Error(`Produk dengan id-${id} tidak ditemukan!`);
        err.statusCode = 404;
        throw err;
      }
      throw new Error(`Gagal mengupdate produk dengan id-${id}`);
    }
  }

  static async deleteProduct(id) {
    try {
      await prisma.product.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error.code === "P2025") {
        const err = new Error(`Produk dengan id-${id} tidak ditemukan!`);
        err.statusCode = 404;
        throw err;
      }
      throw new Error(`Gagal menghapus produk dengan id-${id}`);
    }
  }
}

module.exports = Product;
