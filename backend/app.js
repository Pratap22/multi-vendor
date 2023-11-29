const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const app = express();

const appRouter = require("./controller");
const LWPError = require("./utils/error");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/test", (req, res) => {
  throw new LWPError();
});

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

module.exports = app;
