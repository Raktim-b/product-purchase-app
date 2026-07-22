const express = require("express");
const softDeleteCategoryRouter = express.Router();
const AuthCheck = require("../../middleware/authCheck");
const roleCheck = require("../../middleware/roleCheck");
const softDeleteCategoryController = require("../../controller/category/softDeleteCategory.controller");

softDeleteCategoryRouter.get(
  "/delete/:id",
  AuthCheck,
  roleCheck("admin"),
  softDeleteCategoryController.SoftDelete,
);
module.exports = softDeleteCategoryRouter;
