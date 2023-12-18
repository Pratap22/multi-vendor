const express = require("express");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
const UserModel = require("../model/User");
const LWPError = require("../utils/error");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get(
  "/",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user._id);

      if (!user) {
        return next(new LWPError("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new LWPError(error.message, 500));
    }
  })
);

userRouter.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new LWPError("Name cannot be empty", 400));
    }

    if (!password) {
      return next(new LWPError("Password cannot be empty", 400));
    }

    // Email validation
    // Check if the email is in a valid format
    // Regex

    const allUsers = await UserModel.find({ email });

    const isEmailExists = allUsers.length > 0;
    if (isEmailExists) {
      return next(
        new LWPError("User with the provided email already exists", 400)
      );
    }

    const activationToken = createActivationToken({ name, email, password });
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    await sendMail({
      email: email,
      subject: "Please Activate Your Account",
      message: `To activate your account click the link ${activationUrl}`,
    });
    res
      .status(200)
      .json({ success: true, message: "User Activation link sent" });
  })
);

userRouter.get(
  "/activation/:token",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.params;

      const { name, email, password } = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const allUsers = await UserModel.find({ email });

      const isEmailExists = allUsers.length > 0;
      if (isEmailExists) {
        return next(
          new LWPError("User with the provided email already exists", 401)
        );
      }

      const userCreated = await UserModel.create({ name, email, password });
      sendToken(userCreated, 201, res);
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

const createActivationToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "22h" });
};

userRouter.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // validate email and password
      if (!email || !password) {
        return next(new LWPError("Email and password are required", 400));
      }
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new LWPError("User with the provided email not found", 404)
        );
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new LWPError("The provided password doesn't match", 401));
      }
      user.password = undefined;
      sendToken(user, 200, res);
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

module.exports = userRouter;
