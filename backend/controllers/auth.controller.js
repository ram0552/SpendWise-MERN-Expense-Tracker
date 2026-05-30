import bcrypt from "bcryptjs";
import validator from "validator";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const forgotPassword =
  async (req, res) => {

    try {
      console.log(req.body.email);
      console.log(process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS ? "PASS FOUND" : "PASS MISSING");
      
      const user =
        await User.findOne({
          email: req.body.email,
        });
        console.log(user);
        

      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const resetToken =
        crypto
          .randomBytes(20)
          .toString("hex");

      user.resetPasswordToken =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      user.resetPasswordExpire =
        Date.now() +
        10 * 60 * 1000;

      await user.save();

     const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      await sendEmail({
        email: user.email,
        subject:
          "SpendWise Password Reset",
        message: `
          <h3>Password Reset</h3>
          <a href="${resetUrl}">
            Reset Password
          </a>
        `,
      });

      res.status(200).json({
        success: true,
        message:
          "Reset email sent",
      });

    } catch (error) {

      console.log(
        "Forgot Password Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const resetPassword =
  async (req, res) => {
    console.log("Reset route hit");
    console.log("Token:", req.params.token);

    const resetPasswordToken =
      crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user =
      await User.findOne({

        resetPasswordToken,

        resetPasswordExpire: {
          $gt: Date.now(),
        },
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid token",
      });
    }

    user.password =
  await bcrypt.hash(
    req.body.password,
    10
  );

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.json({
      success: true,
      message:
        "Password updated",
    });
  };
