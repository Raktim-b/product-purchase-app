const express = require("express");
const trashCategoryRouter = express.Router();
const AuthCheck = require("../../middleware/authCheck");
const roleCheck = require("../../middleware/roleCheck");
const trashCategoryController = require("../../controller/category/trashCategory.controller");
trashCategoryRouter.get(
  "/trash",
  AuthCheck,
  roleCheck("admin"),
  trashCategoryController.Trash,
);
trashCategoryRouter.get(
  "/restore/:id",
  AuthCheck,
  roleCheck("admin"),
  trashCategoryController.Restore,
);
trashCategoryRouter.get(
  "/hardDelete/:id",
  AuthCheck,
  roleCheck("admin"),
  trashCategoryController.HardDelete,
);
module.exports = trashCategoryRouter;
