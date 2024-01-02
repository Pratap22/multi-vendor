const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {})
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = { connectDatabase };
