const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const LWPError = require("../utils/error");
const Order = require("../model/Order");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, userId, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          userId,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new LWPError(error.message, 500));
    }
  })
);

orderRouter.get(
  "/user/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "userId": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new LWPError(error.message, 500));
    }
  })
);

// get all orders of seller
orderRouter.get(
  "/shop/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new LWPError(error.message, 500));
    }
  })
);

module.exports = orderRouter;