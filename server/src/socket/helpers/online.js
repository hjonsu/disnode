const onlineUsers = new Map();

const add = (socketId, userId) => {
  // TODO: uncomment this for multi-device compatibility
  // BUT make sure you emit online/offline once only for each user
  // regardless of how many devices (sockets) they have open

  if (onlineUsers.has(userId)) {
    onlineUsers.get(userId).add(socketId);
  } else {
    onlineUsers.set(userId, new Set([socketId]));
  }
};

const remove = (socketId, userId) => {
  if (onlineUsers.has(userId)) {
    let userSocketIds = onlineUsers.get(userId);
    userSocketIds.delete(socketId);

    if (userSocketIds.size === 0) onlineUsers.delete(userId);
  }
};

const all = () => [...onlineUsers.keys()];

module.exports = { add, remove, all };
