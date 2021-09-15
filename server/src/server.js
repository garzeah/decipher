const http = require("http");
const app = require("./app");
require("dotenv").config();

const { mongoConnect } = require("./services/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();

  server.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));
};

startServer();