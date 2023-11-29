const express = require("express");

const appRouter = express.Router();

appRouter.get("/", (req, res) => {
  res.send("appRouter");
});

const userRouter = require("./user");
const shopRouter = require("./shop");
const productRouter = require("./product");

appRouter.use("/user", userRouter);
appRouter.use("/shop", shopRouter);
appRouter.use("/product", productRouter);

module.exports = appRouter;
