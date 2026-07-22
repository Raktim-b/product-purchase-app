const ProductModel = require("../../model/product.db");
const httpStatusCode = require("../../util/httpStatusCode");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");
const CategoryModel = require("../../model/categoryModel");
class EditProductProductPage {
  async editProductPage(req, res) {
    try {
      const id = req.params.id;
      const editProductItem = await ProductModel.findById(id);
      const categories = await CategoryModel.find({
        status: true,
      });

      res.render("product/editProduct", {
        title: "Edit Product",
        data: editProductItem,
        categories,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const updatData = await ProductModel.findById(id);
      if (!updatData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "id not found",
        });
      }
      let updateObj = { ...req.body };
      if (req.file) {
        if (updatData.public_id) {
          await cloudinary.uploader.destroy(updatData.public_id);
        }
        updateObj.image = req.file.path;
        updateObj.public_id = req.file.filename;
      }
      await ProductModel.findByIdAndUpdate(id, updateObj, {
        new: true,
      });

      return res.redirect("/products");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new EditProductProductPage();
