const socket = require("socket.io");

const socketIO = (server) => {
  // Socket server is listening to our server
  const io = socket(server);

  // Socket.io related code
  io.on("connection", (socket) => {
    // Means message was successfully sent
    socket.on("messageToServer", (status) => {
      // Returning true to all clients so we can update their state
      io.emit("messageFromServer", status);
    });
  });
};

module.exports = socketIO;
