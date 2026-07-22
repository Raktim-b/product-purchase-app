const { default: mongoose } = require("mongoose");
const ProductModel = require("../../model/product.db");
const httpStatusCode = require("../../util/httpStatusCode");
class UserController {
  async userPage(req, res) {
    try {
      const products = await ProductModel.aggregate([
        {
          $match: {
            isDelete: false,
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
      res.render("user/userPage", {
        title: "Product Page",
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async productDetails(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
      ]);

      if (!product.length) {
        return res.redirect("/userPage");
      }

      res.render("user/productDetails", {
        title: "Product Details",
        product: product[0],
        success: req.query.success,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
