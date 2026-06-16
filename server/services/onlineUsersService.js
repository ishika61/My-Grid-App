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
      cooldownUntil: null,
      captureInFlight: false,
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

  getCooldown(socketId) {
    const user = this.get(socketId);
    const now = Date.now();
    const cooldownTime = user?.cooldownUntil
      ? new Date(user.cooldownUntil).getTime()
      : 0;
    const remainingMs = Math.max(0, cooldownTime - now);

    return {
      cooldownUntil: user?.cooldownUntil || null,
      remainingMs,
      isActive: remainingMs > 0,
    };
  }

  setCaptureInFlight(socketId, isInFlight) {
    const user = this.get(socketId);

    if (!user) {
      return;
    }

    user.captureInFlight = isInFlight;
  }

  isCaptureInFlight(socketId) {
    return Boolean(this.get(socketId)?.captureInFlight);
  }

  markCapture(socketId, cooldownMs) {
    const user = this.get(socketId);

    if (!user) {
      return null;
    }

    const cooldownUntil = new Date(Date.now() + cooldownMs).toISOString();
    user.cooldownUntil = cooldownUntil;

    return cooldownUntil;
  }

  hasUsername(username) {
    const normalized = username.trim().toLowerCase();

    return this.getAll().some(
      (user) => user.username.toLowerCase() === normalized
    );
  }

  getCount() {
    return this.users.size;
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getPublicList() {
    return this.getAll().map(({ socketId, username, color, cooldownUntil }) => ({
      socketId,
      username,
      color,
      cooldownUntil,
    }));
  }
}

module.exports = new OnlineUsersService();
