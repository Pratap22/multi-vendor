const loadEnv = require("dotenv");
const app = require("./app");
const db = require("./db/db");

loadEnv.config({
  path: "config/.env",
});

db.connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// If any un-handled exceptions then we will shut down the server
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
