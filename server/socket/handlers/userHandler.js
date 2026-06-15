const SOCKET_EVENTS = require("../events");
const onlineUsersService = require("../../services/onlineUsersService");
const generateUserColor = require("../../utils/generateColor");
const validateUsername = require("../../utils/validateUsername");

const broadcastOnlineUpdate = (io) => {
  io.emit(SOCKET_EVENTS.ONLINE_UPDATE, {
    count: onlineUsersService.getCount(),
    users: onlineUsersService.getPublicList(),
  });
};

const registerUserHandlers = (io, socket) => {
  socket.on(SOCKET_EVENTS.USER_JOIN, ({ username } = {}) => {
    const validation = validateUsername(username);

    if (!validation.valid) {
      socket.emit(SOCKET_EVENTS.USER_JOIN_ERROR, {
        message: validation.message,
      });
      return;
    }

    if (onlineUsersService.has(socket.id)) {
      socket.emit(SOCKET_EVENTS.USER_JOIN_ERROR, {
        message: "You have already joined",
      });
      return;
    }

    const color = generateUserColor();

    onlineUsersService.add(socket.id, {
      username: validation.username,
      color,
    });

    socket.emit(SOCKET_EVENTS.USER_JOINED, {
      username: validation.username,
      color,
      socketId: socket.id,
    });

    broadcastOnlineUpdate(io);
  });

  socket.on("disconnect", () => {
    if (onlineUsersService.has(socket.id)) {
      onlineUsersService.remove(socket.id);
      broadcastOnlineUpdate(io);
    }
  });
};

module.exports = {
  registerUserHandlers,
  broadcastOnlineUpdate,
};
