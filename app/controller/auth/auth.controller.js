const RegistrationModel = require("../../model/registration.db");
const httpStatusCode = require("../../util/httpStatusCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../../util/sendEmail");
const emailVerificationModel = require("../../model/otpModel");
const sendLoginOtpEmail = require("../../util/loginOtpEmail");
const loginOtpModel = require("../../model/loginOtpModel");
const { registrationValidation } = require("../../validation/auth.validation");
class AuthController {
  async registrationPage(req, res) {
    res.render("auth/registration", {
      title: "Registration",
    });
  }
  async adminRegistrationPage(req, res) {
    res.render("auth/registrationAdmin", {
      title: "Admin Registration",
    });
  }
  async userRegistration(req, res) {
    try {
      const { error, value } = registrationValidation.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        return res.redirect("/auth/registration");
      }
      const { name, email, phone, password } = value;


      const existUser = await RegistrationModel.findOne({ email });

      if (existUser) {
        return res.redirect("/auth/registration");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const userData = new RegistrationModel({
        name,
        email,
        phone,
        password: hashPassword,
        role: "user",
      });

      if (req.file) {
        userData.image = req.file.path;
        userData.public_id = req.file.filename;
      }

      const result = await userData.save();

      await sendEmail(req, result);

      return res.redirect("/auth/verifyPage");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async adminRegistration(req, res) {
    try {
      const { error, value } = registrationValidation.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        return res.redirect("/auth/registration");
      }
      const { name, email, phone, password } = value;

      const existAdmin = await RegistrationModel.findOne({ email });

      if (existAdmin) {
        return res.redirect("/auth/registration/admin");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const adminData = new RegistrationModel({
        name,
        email,
        phone,
        password: hashPassword,
        role: "admin",
      });

      if (req.file) {
        adminData.image = req.file.path;
        adminData.public_id = req.file.filename;
      }

      const result = await adminData.save();
      await sendEmail(req, result);

      return res.redirect("/auth/verifyPage");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async loginPage(req, res) {
    res.render("auth/login", {
      title: "Login",
    });
  }

  async logIn(req, res) {
    try {
      const { email } = req.body;

      const user = await RegistrationModel.findOne({ email });

      if (!user) {
        return res.redirect("/auth/login");
      }

      await sendLoginOtpEmail(user);

      // Store email temporarily
      res.cookie("loginEmail", email, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      return res.redirect("/auth/verify-loginPage");
    } catch (error) {
      console.log(error);
    }
  }
  async verifyLoginPage(req, res) {
    res.render("auth/verifyLogin", {
      title: "Verify Login",
    });
  }
  async verifyLoginOtp(req, res) {
    try {
      const { otp } = req.body;

      // Read email from cookie
      const email = req.cookies.loginEmail;

      if (!email) {
        return res.redirect("/auth/login");
      }

      const user = await RegistrationModel.findOne({ email });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const otpData = await loginOtpModel.findOne({
        userId: user._id,
      });

      if (!otpData) {
        console.log("OTP expired");
        return res.redirect("/auth/login");
      }

      if (otpData.otp != otp) {
        console.log("Invalid OTP");
        return res.redirect("/auth/verify-loginPage");
      }

      await loginOtpModel.findByIdAndDelete(otpData._id);

      // Remove the temporary cookie
      res.clearCookie("loginEmail");

      const accessToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "40m" },
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );
      const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
      user.refreshToken = hashedRefreshToken;
      await user.save();
      if (accessToken && refreshToken) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });
        if (user.role === "admin") {
          return res.redirect("/categories");
        } else {
          return res.redirect("/userPage");
        }
      } else {
        console.log("invalid credentials");
        return res.redirect("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        console.log("Refresh token missing");
        return res.redirect("/auth/login");
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await RegistrationModel.findById(decoded.id);
      if (!user) {
        console.log("User not found");
        return res.redirect("/auth/login");
      }
      const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
      if (user.refreshToken !== hashedRefreshToken) {
        console.log("Invalid refresh token");
        return res.redirect("/auth/login");
      }
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "40m",
        },
      );
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
      });

      if (user.role === "admin") {
        return res.redirect("/products");
      } else {
        return res.redirect("/userPage");
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect("/auth/login");
    }
  }
  async verifyPage(req, res) {
    res.render("auth/verifyPage", {
      title: "Verify Page",
    });
  }
  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        console.log("All fields are required");
        return res.redirect("/auth/verifyPage");
      }
      const existingUser = await RegistrationModel.findOne({ email });
      if (!existingUser) {
        console.log("Invalid credentials");
        return res.redirect("/auth/verifyPage");
      }
      if (existingUser.isVerified) {
        console.log("Email already verified");
        return res.redirect("/auth/login");
      }
      const emailVerification = await emailVerificationModel.findOne({
        userId: existingUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!existingUser.isVerified) {
          await sendEmail(req, existingUser);
          console.log("Invalid OTP, new OTP sent to your email");
          return res.redirect("/auth/login");
        }
        console.log("Invalid OTP");
        return res.redirect("/auth/login");
      }
      const currentTime = new Date();
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000,
      );
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await sendEmail(req, existingUser);
        console.log("OTP expired, new OTP sent to your email");
        return res.redirect("/auth/login");
      }
      existingUser.isVerified = true;
      await existingUser.save();
      await emailVerificationModel.deleteMany({ userId: existingUser._id });
      res.redirect("/auth/login");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async logout(req, res) {
    try {
      res.clearCookie("loginEmail");

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.redirect("/auth/login");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AuthController();
