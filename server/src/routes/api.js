const express = require("express");
const authRouter = require("./auth/auth.router");
const userRouter = require("./users/users.router");
const conversationRouter = require("./conversations/conversations.router");
const googleRouter = require("./google/google.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/users", userRouter);
api.use("/conversations", conversationRouter);
api.use("/google", googleRouter);

module.exports = api;
