const httpStatusCode = require("../util/httpStatusCode");
const ProductDetails = require("../model/product.db");
class ProductController {
  async createProduct(req, res) {
    try {
      console.log(req.body);
      const { name, size, price, color, desc, image, category } = req.body;
      const dupProduct = await ProductDetails.findOne({ name });
      if (dupProduct) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Duplicate Product",
        });
      }
      if (!name || !size || !price || !color || !image || !category) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }
      const product = await ProductDetails({
        name,
        size,
        price,
        color,
        desc,
        image,
        category,
      });
      const result = await product.save();
      if (result) {
        return res.status(httpStatusCode.CREATED).json({
          success: true,
          message: "Product Added successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getProduct(req, res) {
    try {
      const showData = await ProductDetails.find();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Student get successfully",
        data: showData,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  //   async findOneProduct(req, res) {
  //     try {
  //       const { name } = req.body;
  //       const checkProduct = await ProductDetails.findOne({ name });
  //       return res.status(httpStatusCode.OK).json({
  //         success: true,
  //         message: "data Updated successfully",
  //         data: checkProduct,
  //       });
  //     } catch (error) {
  //       return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
  //         success: false,
  //         message: error.message,
  //       });
  //     }
  //   }
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const productId = await ProductDetails.findById(id);
      if (!productId) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "id not found",
        });
      }
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "data Updated successfully",
        data: productId,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  
  async updtProduct(req, res) {
    try {
      const id = req.params.id;
      const updatData = await ProductDetails.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "id not found",
        });
      }
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "data Updated successfully",
        data: updatData,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const deleteData = await ProductDetails.findByIdAndDelete(id, req.body, {
        new: true,
      });
      if (!deleteData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "id not found",
        });
      }
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "data Updated successfully",
        data: deleteData,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  
}
module.exports = new ProductController();
