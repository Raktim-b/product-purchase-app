const CategoryModel = require("../../model/categoryModel");
const ProductModel = require("../../model/product.db");
const httpStatusCode = require("../../util/httpStatusCode");

class categoryPageController {
  async categoryPage(req, res) {
    try {
      const category = await CategoryModel.find({
        status: true,
      });

      return res.render("category/categories", {
        title: "Category List",
        data: category,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new categoryPageController();
