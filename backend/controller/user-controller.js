const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("userRouter");
});

userRouter.get("/create", (req, res) => {
  res.send("Create");
});

module.exports = userRouter;
