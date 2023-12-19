const express = require("express");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
const Shop = require("../model/Shop");
const LWPError = require("../utils/error");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");

const shopRouter = express.Router();

shopRouter.get(
  "/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.shop._id);

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user: shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

shopRouter.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phoneNumber, address, zipCode } = req.body;

    if (!name) {
      return next(new LWPError("Name cannot be empty", 400));
    }

    if (!password) {
      return next(new LWPError("Password cannot be empty", 400));
    }

    if (!email) {
      return next(new LWPError("Email cannot be empty", 400));
    }

    // Email validation
    // Check if the email is in a valid format
    // Regex

    const allShops = await Shop.find({ email });

    const isEmailExists = allShops.length > 0;
    if (isEmailExists) {
      return next(
        new LWPError("Shop with the provided email already exists", 400)
      );
    }

    const activationToken = createActivationToken({
      name,
      email,
      password,
      phoneNumber,
      address,
      zipCode,
    });
    const activationUrl = `http://localhost:5173/shop-activation/${activationToken}`;
    await sendMail({
      email: email,
      subject: "Please Activate Your Account",
      message: `To activate your account click the link ${activationUrl}`,
    });
    res
      .status(200)
      .json({ success: true, message: "Shop Activation link sent" });
  })
);

shopRouter.get(
  "/activation/:token",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.params;

      const { name, email, password, phoneNumber, address, zipCode } =
        jwt.verify(token, process.env.JWT_SECRET);

      const allShops = await Shop.find({ email });

      const isEmailExists = allShops.length > 0;
      if (isEmailExists) {
        return next(
          new LWPError("Shop with the provided email already exists", 401)
        );
      }

      const shopCreated = await Shop.create({
        name,
        email,
        password,
        phoneNumber,
        address,
        zipCode,
      });
      sendToken(shopCreated, 201, res, "shop_token");
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

const createActivationToken = (shopData) => {
  return jwt.sign(shopData, process.env.JWT_SECRET, { expiresIn: "22h" });
};

shopRouter.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // validate email and password
      if (!email || !password) {
        return next(new LWPError("Email and password are required", 400));
      }
      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(
          new LWPError("Shop with the provided email not found", 404)
        );
      }

      const isPasswordMatched = await shop.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new LWPError("The provided password doesn't match", 401));
      }

      sendToken(shop, 200, res, "shop_token");
    } catch (err) {
      return next(new LWPError(err, 500));
    }
  })
);

module.exports = shopRouter;
