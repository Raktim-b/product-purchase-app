const express = require("express");
const purchaseRouter = express.Router();
const purchaseController = require("../../controller/user/purchase.controller");
const AuthCheck = require("../../middleware/authCheck");

purchaseRouter.post(
  "/purchase/:productId",
  AuthCheck,
  purchaseController.purchaseProduct,
);

purchaseRouter.get("/purchase/history",AuthCheck, purchaseController.purchaseHistory);

module.exports = purchaseRouter;
