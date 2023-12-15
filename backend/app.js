const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const app = express();

const appRouter = require("./controller");
const requestMiddleware = require("./middleware/requestLogger");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(requestMiddleware)

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/test", (req, res) => {
  res.send(typeof req.query.extention);
});

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

module.exports = app;
