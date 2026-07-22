const express = require("express");
const categoryRouter = express.Router();
const AuthCheck = require("../../middleware/authCheck");
const authController = require("../../controller/auth/auth.controller");
const roleCheck = require("../../middleware/roleCheck");
const categoryPageController = require("../../controller/category/categoryPage.controller");
categoryRouter.get(
  "/",
  AuthCheck,
  roleCheck("admin"),
  categoryPageController.categoryPage,
);

module.exports = categoryRouter;
