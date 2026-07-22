const { default: mongoose } = require("mongoose");
const ProductModel = require("../../model/product.db");
const PurchaseModel = require("../../model/purchaseModel");
const httpStatusCode = require("../../util/httpStatusCode");

class PurchaseController {
  async purchaseProduct(req, res) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;

      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stock < quantity) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      const purchase = new PurchaseModel({
        user: req.user.id,
        product: product._id,
        quantity,
        price: product.price,
        totalPrice: product.price * quantity,
      });

      await purchase.save();

      product.stock -= quantity;
      await product.save();
      return res.redirect(
        `/userPage/products/${product._id}?success=Product purchased successfully`,
      );
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async purchaseHistory(req, res) {
    try {
      const purchases = await PurchaseModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.id),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "categories",
            localField: "product.category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: 1,
            quantity: 1,
            price: 1,
            totalPrice: 1,
            createdAt: 1,

            "product._id": 1,
            "product.name": 1,
            "product.image": 1,

            category: "$category.name",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      return res.render("user/purchaseHistory", {
        title: "Purchase History",
        purchases,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new PurchaseController();
