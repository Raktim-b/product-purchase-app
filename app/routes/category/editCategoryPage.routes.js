const express = require("express");
const editCategoryRouter = express.Router();
const ProductImage = require("../../middleware/fileUploades");
const AuthCheck = require("../../middleware/authCheck");
const roleCheck = require("../../middleware/roleCheck");
const editCategoryPageController = require("../../controller/category/editCategoryPage.controller");
editCategoryRouter.get(
  "/edit/:id",
  editCategoryPageController.editCategoryPage,
);
editCategoryRouter.post(
  "/update/:id",
  AuthCheck,
  roleCheck("admin"),
  ProductImage.single("image"),
  editCategoryPageController.updateCategory,
);
module.exports = editCategoryRouter;
