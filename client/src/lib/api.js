import { API_URL } from "./constants";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const fetchGrid = () =>
  fetch(`${API_URL}/api/grid`).then(handleResponse);

export const fetchStats = () =>
  fetch(`${API_URL}/api/stats/stats`).then(handleResponse);

export const fetchLeaderboard = () =>
  fetch(`${API_URL}/api/stats/leaderboard`).then(handleResponse);

export const fetchActivity = () =>
  fetch(`${API_URL}/api/stats/activity`).then(handleResponse);

export const fetchOnlineUsers = () =>
  fetch(`${API_URL}/api/stats/online`).then(handleResponse);
