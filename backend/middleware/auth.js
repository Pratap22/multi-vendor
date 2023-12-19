const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Shop = require("../model/Shop");
const LWPError = require("../utils/error");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new LWPError("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  if (!req.user) {
    res.clearCookie("token");
    return next(new LWPError("Token is not valid! Login to continue", 401));
  }

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { shop_token } = req.cookies;
  if (!shop_token) {
    return next(new LWPError("The Shop token is not in the cookie", 401));
  }

  const decoded = jwt.verify(shop_token, process.env.JWT_SECRET);

  req.shop = await Shop.findById(decoded.id);

  if (!req.shop) {
    res.clearCookie("shop_token");
    return next(new LWPError("Token is not valid! Login to continue", 401));
  }

  next();
});
