function validateCategoryName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    const error = new Error("Nama kategori tidak boleh kosong!");
    error.statusCode = 400;
    return next(error);
  }
  next();
}

module.exports = validateCategoryName;
