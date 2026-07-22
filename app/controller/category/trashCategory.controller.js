const CategoryModel = require("../../model/categoryModel");
const httpStatusCode = require("../../util/httpStatusCode");
const cloudinary = require("../../config/cloudinary");
class TrashCategoryController {
  async Trash(req, res) {
    try {
      const data = await CategoryModel.find({ status: false });
      res.render("category/trashCategory", {
        title: "trash",
        data: data,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async Restore(req, res) {
    try {
      const id = req.params.id;
      await CategoryModel.findByIdAndUpdate(
        id,
        { status: true },
        { new: true },
      );
      return res.redirect("/categories/trash");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async HardDelete(req, res) {
    try {
      const id = req.params.id;

      const deleteData = await CategoryModel.findById(id);

      if (!deleteData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      // Delete image from Cloudinary
      if (deleteData.public_id) {
        await cloudinary.uploader.destroy(deleteData.public_id);
      }

      // Delete document from MongoDB
      await CategoryModel.findByIdAndDelete(id);

      return res.redirect("/categories/trash");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TrashCategoryController();
