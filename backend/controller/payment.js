const express = require("express");
const loadEnv = require("dotenv");
const Stripe = require("stripe");

loadEnv.config({
  path: "config/.env",
});
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const paymentRouter = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
paymentRouter.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "LearnWithPratap",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

paymentRouter.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = paymentRouter;
