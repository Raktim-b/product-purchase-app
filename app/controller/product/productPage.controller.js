const ProductModel = require("../../model/product.db");
const httpStatusCode = require("../../util/httpStatusCode");

class ProductPageController {
  async productPage(req, res) {
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

      return res.render("product/product", {
        title: "Product List",
        data: products,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductPageController();
