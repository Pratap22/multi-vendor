const express = require("express");
const cloudinary = require("cloudinary");
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

      res.status(200).json({
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
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const productData = req.body;
      productData.shopId = req.shop._id;
      productData.images = imagesLinks;

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

      for (let i = 0; 1 < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

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
