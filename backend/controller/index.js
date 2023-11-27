const express = require("express");

const appRouter = express.Router();

appRouter.get("/", (req, res) => {
  res.send("appRouter");
});

const userRouter = require("./user-controller");
const sellerRouter = require("./seller-controller");

appRouter.use("/user", userRouter);
appRouter.use("/seller", sellerRouter);

module.exports = appRouter;
