const express = require("express");
const productRouter = express.Router();
const ProductPageController = require("../../controller/product/productPage.controller");
const AuthCheck = require("../../middleware/authCheck");
const authController = require("../../controller/auth/auth.controller");
const roleCheck = require("../../middleware/roleCheck");
productRouter.get(
  "/",
  AuthCheck,
  roleCheck("admin"),
  ProductPageController.productPage,
);
productRouter.get("/logout", AuthCheck, authController.logout);
// productRouter.get("/filter", ProductPageController.filterProduct);
module.exports = productRouter;
