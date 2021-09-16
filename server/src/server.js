const http = require("http");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const { isDatabaseWorking } = require("./services/db");

const startServer = () => {
  isDatabaseWorking();
  server.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));
};

startServer();
