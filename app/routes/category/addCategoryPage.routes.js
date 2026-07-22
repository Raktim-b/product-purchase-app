const express = require("express");
const addCategoryRouter = express.Router();
const ProductImage = require("../../middleware/fileUploades");
const roleCheck = require("../../middleware/roleCheck");
const AuthCheck = require("../../middleware/authCheck");
const addCategoryPageController = require("../../controller/category/addCategoryPage.controller");
addCategoryRouter.get("/add", addCategoryPageController.addCategory);
addCategoryRouter.post(
  "/post",
  ProductImage.single("image"),
  AuthCheck,
  roleCheck("admin"),
  addCategoryPageController.createCategory,
);

module.exports = addCategoryRouter;
