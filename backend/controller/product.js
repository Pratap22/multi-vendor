const express = require("express");
const LWPError = require("../utils/error");
const Product = require("../model/Product");
const Shop = require("../model/Shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.get(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new LWPError(error, 400));
    }
  })
);

productRouter.post(
  "/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productData = req.body;
      productData.shopId = req.shop._id

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new LWPError(error, 400));
    }
  })
);

productRouter.get(
  "/shop/:shopId",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.shopId });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new LWPError(error, 400));
    }
  })
);

productRouter.delete(
  "/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return next(new LWPError("Product is not found with this id", 404));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new LWPError(error, 400));
    }
  })
);

module.exports = productRouter;
