const httpStatusCode = require("../../util/httpStatusCode");
const ProductDetails = require("../../model/product.db");
const fs = require("fs");
class TrashController {
  async Trash(req, res) {
    try {
      const data = await ProductDetails.aggregate([
        {
          $match: {
            isDelete: true,
          },
        },
        {
          $lookup: {
            from: "categories", // Collection name of Category model
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
      ]);
      res.render("product/trash", {
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
      await ProductDetails.findByIdAndUpdate(
        id,
        { isDelete: false },
        { new: true },
      );
      return res.redirect("/products/trash");
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
      const deleteData = await ProductDetails.findById(id);
      if (!deleteData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "id not found",
        });
      }
      if (deleteData.image) {
        fs.unlink(`./${deleteData.image}`, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      await ProductDetails.findByIdAndDelete(id);
      return res.redirect("/products/trash");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TrashController();
