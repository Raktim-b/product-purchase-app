const express = require("express");
const AuthCheck = require("../../middleware/authCheck");
const roleCheck = require("../../middleware/roleCheck");
const userPageController = require("../../controller/user/userPage.controller");
const authController = require("../../controller/auth/auth.controller");
const userRouter = express.Router();

userRouter.get("/", AuthCheck, userPageController.userPage);
userRouter.get("/products/:id", userPageController.productDetails);

userRouter.get("/logout", AuthCheck, authController.logout);

module.exports = userRouter;
