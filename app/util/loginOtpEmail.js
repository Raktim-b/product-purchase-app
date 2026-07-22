const transporter = require("../config/emailVerify");
const LoginOtp = require("../model/loginOtpModel");

const sendLoginOtpEmail = async (user) => {
  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  // Remove old OTPs
  await LoginOtp.deleteMany({
    userId: user._id,
  });

  // Save new OTP
  await LoginOtp.create({
    userId: user._id,
    otp,
  });

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Login OTP",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Login Verification</h2>

        <p>Hello <b>${user.name}</b>,</p>

        <p>Your login OTP is:</p>

        <h1 style="
            background:#2563eb;
            color:white;
            display:inline-block;
            padding:10px 30px;
            letter-spacing:6px;
            border-radius:8px;
        ">
            ${otp}
        </h1>

        <p>This OTP will expire in <b>15 minutes</b>.</p>

        <p>If you didn't request this login, ignore this email.</p>
      </div>
    `,
  });

  return otp;
};

module.exports = sendLoginOtpEmail;
