const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const paymentRouter = express.Router();

paymentRouter.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = paymentRouter;
