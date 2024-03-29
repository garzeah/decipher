const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

// Routers
const api = require("./routes/api");

// Initializing Express
const app = express();

// Initializing Middlewares
app.use(express.json());
app.use(cookieParser());

// Endpoints
app.use("/api/v1", api);

// For Heroku production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
