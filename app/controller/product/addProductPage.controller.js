const httpStatusCode = require("../../util/httpStatusCode");
const ProductDetails = require("../../model/product.db");
const CategoryModel = require("../../model/categoryModel");
const productValidation = require("../../validation/product.validation");
class AddProductPageController {
  async addProduct(req, res) {
    const categories = await CategoryModel.find({
      status: true,
    });

    res.render("product/addProduct", {
      title: "Add Product",
      categories,
    });
  }
  async createProduct(req, res) {
    try {
      const { error, value } = productValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name, price, stock, category } = value;

      const dupProduct = await ProductDetails.findOne({ name });

      if (dupProduct) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Duplicate Product",
        });
      }

      const categoryExists = await CategoryModel.findById(category);

      if (!categoryExists) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category not found",
        });
      }

      const product = new ProductDetails({
        name,
        price,
        stock,
        category,
      });

      if (req.file) {
        product.image = req.file.path;
        product.public_id = req.file.filename;
      }

      const result = await product.save();

      const io = req.app.get("io");
      io.emit("newProduct", result);

      return res.redirect("/products");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AddProductPageController();
