const logger = require("./logger");
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    logger.error(err);
  }
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
