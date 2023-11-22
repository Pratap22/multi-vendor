const express = require("express");

const appRouter = express.Router();

appRouter.get("/", (req, res) => {
  res.send("appRouter");
});

const userRouter = require("./user-controller");

appRouter.use("/user", userRouter);

module.exports = appRouter;
