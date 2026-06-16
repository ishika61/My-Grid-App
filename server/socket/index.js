const { Server } = require("socket.io");
const SOCKET_EVENTS = require("./events");
const { registerUserHandlers } = require("./handlers/userHandler");
const { registerGridHandlers } = require("./handlers/gridHandler");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    registerUserHandlers(io, socket);
    registerGridHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io initialized");

  return io;
};

module.exports = {
  initializeSocket,
  SOCKET_EVENTS,
};
