const CategoryModel = require("../../model/categoryModel");
const httpStatusCode = require("../../util/httpStatusCode");
const categoryValidation = require("../../validation/category.validation");
class AddCategoryPageController {
  async addCategory(req, res) {
    res.render("category/addCategory", {
      title: "Add Category",
    });
  }
  async createCategory(req, res) {
    try {
      const { error, value } = categoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { name } = value;

      const duplicateCategory = await CategoryModel.findOne({ name });

      if (duplicateCategory) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category = new CategoryModel({
        name,
      });

      if (req.file) {
        category.image = req.file.path;
      }

      await category.save();

      return res.redirect("/categories");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AddCategoryPageController();
