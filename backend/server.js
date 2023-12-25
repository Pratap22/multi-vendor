const loadEnv = require("dotenv");
const http = require("http");
const app = require("./app");
const db = require("./db/db");
const configureSocket = require("./socket");

loadEnv.config({
  path: "config/.env",
});

db.connectDatabase();

const httpServer = http
  .createServer(app)
  .listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `Server is running on http://${process.env.HOST}:${process.env.PORT}`
    );
  });

configureSocket(httpServer);

// If any un-handled exceptions then we will shut down the server
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  httpServer.close(() => {
    process.exit(1);
  });
});
