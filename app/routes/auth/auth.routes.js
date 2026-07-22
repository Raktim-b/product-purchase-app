const express = require("express");
const authRouter = express.Router();
const authController = require("../../controller/auth/auth.controller");
const ProductImage = require("../../middleware/fileUploades");

authRouter.get("/registration", authController.registrationPage);
authRouter.get("/registration/admin", authController.adminRegistrationPage);

authRouter.post(
  "/registration",
  ProductImage.single("image"),
  authController.userRegistration,
);

authRouter.post(
  "/registration/admin",
  ProductImage.single("image"),
  authController.adminRegistration,
);

authRouter.get("/login", authController.loginPage);
authRouter.post("/login/create", authController.logIn);
authRouter.post("/verify-login-otp", authController.verifyLoginOtp);
authRouter.get("/verify-loginPage", authController.verifyLoginPage);

authRouter.get("/refresh-token", authController.refreshToken);

authRouter.get("/verifyPage", authController.verifyPage);
authRouter.post("/verify", authController.verify);

module.exports = authRouter;
