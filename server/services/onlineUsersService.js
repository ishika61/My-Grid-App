class OnlineUsersService {
  constructor() {
    this.users = new Map();
  }

  add(socketId, { username, color }) {
    this.users.set(socketId, {
      socketId,
      username,
      color,
      joinedAt: new Date().toISOString(),
    });
  }

  remove(socketId) {
    this.users.delete(socketId);
  }

  get(socketId) {
    return this.users.get(socketId) || null;
  }

  has(socketId) {
    return this.users.has(socketId);
  }

  getCount() {
    return this.users.size;
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getPublicList() {
    return this.getAll().map(({ username, color }) => ({ username, color }));
  }
}

module.exports = new OnlineUsersService();
