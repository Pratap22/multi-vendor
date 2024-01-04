const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const app = express();

const appRouter = require("./controller");
const morgan = require("./middleware/morgan");

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/test", (req, res) => {
  res.send(typeof req.query.extention);
});

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

module.exports = app;
