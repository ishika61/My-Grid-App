const validateUsername = (username) => {
  if (typeof username !== "string") {
    return { valid: false, message: "Username must be a string" };
  }

  const trimmed = username.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "Username must be at least 2 characters" };
  }

  if (trimmed.length > 20) {
    return { valid: false, message: "Username must be 20 characters or less" };
  }

  if (!/^[a-zA-Z0-9_\- ]+$/.test(trimmed)) {
    return {
      valid: false,
      message: "Username can only contain letters, numbers, spaces, _ and -",
    };
  }

  return { valid: true, username: trimmed };
};

module.exports = validateUsername;
