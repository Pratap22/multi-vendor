const logger = require("./logger");
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.trace(err)
  }
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";
  req.message = err.message

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
