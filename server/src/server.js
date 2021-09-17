const http = require("http");
const app = require("./app");
const { isDatabaseWorking } = require("./services/db");
const { socketIO } = require("./services/socketIO");
require("dotenv").config();

// Initializing our express server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
  isDatabaseWorking();
  await socketIO(server);
  server.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));
};

startServer();
