const express = require("express");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("userRouter");
});

userRouter.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  //TODO - Name, email, password validation

  const activationToken = createActivationToken({ name, email, password });
  // TODO change the port
  const activationUrl = `http://localhost:8080/api/v1/user/activation/?token=${activationToken}`;
  sendMail({
    email: email,
    subject: "Please Activate Your Account",
    message: `To activate your account click the link ${activationUrl}`,
  });
  res.status(200).json({ success: true, message: "User Activation link sent" });
});

userRouter.get("/activation", (req, res) => {
  const { token } = req.query;
  console.log("Token :: ", token);

  res.status(200).send("User Activated");
});

const createActivationToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "5m" });
};

module.exports = userRouter;
