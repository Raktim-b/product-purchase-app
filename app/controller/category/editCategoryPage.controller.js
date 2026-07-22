const httpStatusCode = require("../../util/httpStatusCode");
const cloudinary = require("../../config/cloudinary");
const CategoryModel = require("../../model/categoryModel");

class EditCategoryPage {
  async editCategoryPage(req, res) {
    try {
      const id = req.params.id;
      const editCategoryItem = await CategoryModel.findById(id);
      res.render("category/editCategory", {
        title: "Edit Category",
        data: editCategoryItem,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const updatData = await CategoryModel.findById(id);
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
      await CategoryModel.findByIdAndUpdate(id, updateObj, {
        new: true,
      });

      return res.redirect("/categories");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new EditCategoryPage();
