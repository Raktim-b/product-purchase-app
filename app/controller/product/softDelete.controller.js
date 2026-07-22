const ProductModel = require("../../model/product.db");
const httpStatusCode = require("../../util/httpStatusCode");
class SoftDeleteController {
  async SoftDelete(req, res) {
    try {
      const id = req.params.id;
      const softDeleleId = await ProductModel.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "data Updated successfully",
        data: softDeleleId,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new SoftDeleteController();
