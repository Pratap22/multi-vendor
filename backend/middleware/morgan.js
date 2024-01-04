const morgan = require("morgan");
const logger = require("./logger");

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

morgan.token("message", function (req, res) {
  return req.message || res.statusMessage;
});

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
