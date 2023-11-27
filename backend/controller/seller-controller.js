const express = require("express");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
const Shop = require("../model/Shop");
const LWPError = require("../utils/error");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const sellerRouter = express.Router();

sellerRouter.get("/", (req, res) => {
  res.send("sellerRouter");
});

sellerRouter.post(
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

    const allSellers = await Shop.find({ email });

    const isEmailExists = allSellers.length > 0;
    if (isEmailExists) {
      return next(
        new LWPError("Seller with the provided email already exists", 400)
      );
    }

    const activationToken = createActivationToken({ name, email, password });
    // TODO change the port
    const activationUrl = `http://localhost:8080/api/v1/seller/activation/?token=${activationToken}`;
    await sendMail({
      email: email,
      subject: "Please Activate Your Account",
      message: `To activate your account click the link ${activationUrl}`,
    });
    res
      .status(200)
      .json({ success: true, message: "Seller Activation link sent" });
  })
);

sellerRouter.get(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.query;

      const { name, email, password } = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const allSellers = await Shop.find({ email });

      const isEmailExists = allSellers.length > 0;
      if (isEmailExists) {
        return next(
          new LWPError("Seller with the provided email already exists", 401)
        );
      }

      const sellerCreated = await Shop.create({ name, email, password });
      sendToken(sellerCreated, 201, res);
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

const createActivationToken = (sellerData) => {
  return jwt.sign(sellerData, process.env.JWT_SECRET, { expiresIn: "22h" });
};

sellerRouter.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // validate email and password
      if (!email || !password) {
        return next(new LWPError("Email and password are required", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(
          new LWPError("Seller with the provided email not found", 404)
        );
      }

      const isPasswordMatched = await seller.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new LWPError("The provided password doesn't match", 401));
      }

      sendToken(seller, 200, res);
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

module.exports = sellerRouter;
