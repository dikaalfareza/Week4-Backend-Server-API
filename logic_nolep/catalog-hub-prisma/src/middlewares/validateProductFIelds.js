function validateProductFields(req, res, next) {
  const { name, price, stock, categoryId } = req.body;

  if (!name || price === null || stock === null || categoryId === null) {
    const error = new Error("Pastikan semua fields tidak ada yang kosong!");
    error.statusCode = 400;
    return next(error);
  }

  if (isNaN(price) || isNaN(stock) || isNaN(categoryId)) {
    const error = new Error("Price, stock, dan categoryId harus berupa angka!");
    error.statusCode = 400;
    return next(error);
  }

  next();
}

module.exports = validateProductFields;
