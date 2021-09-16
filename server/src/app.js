const path = require("path");
const express = require("express");

// Routers
const authRouter = require("./routes/auth/auth.router");
const userRouter = require("./routes/users/users.router");
const conversationRouter = require("./routes/conversations/conversations.router");

// Initializing Express
const app = express();

// Initializing Middlewares
app.use(express.json());

// Endpoints
app.use(authRouter);
app.use(userRouter);
app.use(conversationRouter);

// For Heroku production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't regonize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
