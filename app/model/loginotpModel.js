const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const loginOtpSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const loginOtpModel = mongoose.model("LoginOtp", loginOtpSchema);
module.exports = loginOtpModel;
