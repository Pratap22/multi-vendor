const express = require("express");

const appRouter = express.Router();

appRouter.get("/", (req, res) => {
  res.send("appRouter");
});

const userRouter = require("./user");
const shopRouter = require("./shop");
const productRouter = require("./product");
const orderRouter = require("./order");
const paymentRouter = require("./payment");

appRouter.use("/user", userRouter);
appRouter.use("/shop", shopRouter);
appRouter.use("/product", productRouter);
appRouter.use("/order", orderRouter);
appRouter.use("/payment", paymentRouter);

module.exports = appRouter;
