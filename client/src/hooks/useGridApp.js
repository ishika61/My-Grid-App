"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  fetchActivity,
  fetchGrid,
  fetchLeaderboard,
  fetchOnlineUsers,
  fetchStats,
} from "@/lib/api";
import { API_URL, SOCKET_EVENTS, TOTAL_CELLS } from "@/lib/constants";

const buildCellMap = (cells) => {
  const map = new Array(TOTAL_CELLS).fill(null);

  cells.forEach((cell) => {
    map[cell.index] = cell;
  });

  return map;
};

export function useGridApp() {
  const socketRef = useRef(null);
  const joinedUsernameRef = useRef("");
  const currentUserRef = useRef(null);
  const [cells, setCells] = useState([]);
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activities, setActivities] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({ count: 0, users: [] });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [captureError, setCaptureError] = useState("");
  const [pendingCell, setPendingCell] = useState(null);
  const [recentCaptureIndex, setRecentCaptureIndex] = useState(null);
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [now, setNow] = useState(null);

  const loadInitialData = useCallback(async () => {
    const [gridData, statsData, leaderboardData, activityData, onlineData] =
      await Promise.all([
        fetchGrid(),
        fetchStats(),
        fetchLeaderboard(),
        fetchActivity(),
        fetchOnlineUsers(),
      ]);

    setCells(buildCellMap(gridData.cells));
    setStats(statsData.stats);
    setLeaderboard(leaderboardData.leaderboard);
    setActivities(activityData.activities);
    setOnlineUsers({
      count: onlineData.count,
      users: onlineData.users,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        await loadInitialData();
      } catch (error) {
        if (isMounted) {
          setJoinError(error.message || "Failed to load grid data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    init();

    const socket = io(API_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      if (isMounted) {
        setIsConnected(true);
      }

      if (joinedUsernameRef.current) {
        socket.emit(SOCKET_EVENTS.USER_JOIN, {
          username: joinedUsernameRef.current,
        });
      }
    });

    socket.on("disconnect", () => {
      if (isMounted) {
        setIsConnected(false);
      }
    });

    socket.on(SOCKET_EVENTS.USER_JOINED, (user) => {
      if (isMounted) {
        setCurrentUser(user);
        currentUserRef.current = user;
        joinedUsernameRef.current = user.username;
        setCooldownUntil(user.cooldownUntil || null);
        setJoinError("");
      }
    });

    socket.on(SOCKET_EVENTS.USER_JOIN_ERROR, ({ message }) => {
      if (isMounted) {
        setJoinError(message);
      }
    });

    socket.on(SOCKET_EVENTS.CELL_UPDATE, ({ cell }) => {
      if (!isMounted) return;

      setCells((prev) => {
        const next = [...prev];
        next[cell.index] = cell;
        return next;
      });
      setRecentCaptureIndex(cell.index);
    });

    socket.on(
      SOCKET_EVENTS.CELL_CAPTURE_RESULT,
      ({ success, cell, cooldownUntil: nextCooldownUntil, message }) => {
        if (!isMounted) return;

        setPendingCell(null);

        if (nextCooldownUntil) {
          setCooldownUntil(nextCooldownUntil);
        }

        if (cell) {
          setCells((prev) => {
            const next = [...prev];
            next[cell.index] = cell;
            return next;
          });
        }

        if (!success && message) {
          setCaptureError(message);
          setTimeout(() => {
            if (isMounted) {
              setCaptureError("");
            }
          }, 3000);
        }
      }
    );

    socket.on(SOCKET_EVENTS.ONLINE_UPDATE, ({ count, users }) => {
      if (isMounted) {
        setOnlineUsers({ count, users });
        const me = currentUserRef.current
          ? users.find(
              (user) => user.socketId === currentUserRef.current.socketId
            )
          : null;

        if (me) {
          setCooldownUntil(me.cooldownUntil || null);
        }
      }
    });

    socket.on(SOCKET_EVENTS.ACTIVITY_UPDATE, ({ activity }) => {
      if (!isMounted) {
        return;
      }

      setActivities((prev) => [activity, ...prev].slice(0, 20));
    });

    socket.on(SOCKET_EVENTS.LEADERBOARD_UPDATE, ({ leaderboard: updated }) => {
      if (isMounted) {
        setLeaderboard(updated);
      }
    });

    socket.on(SOCKET_EVENTS.STATS_UPDATE, ({ stats: updated }) => {
      if (isMounted) {
        setStats(updated);
      }
    });

    return () => {
      isMounted = false;
      currentUserRef.current = null;
      socket.disconnect();
    };
  }, [loadInitialData]);

  useEffect(() => {
    if (recentCaptureIndex === null) return undefined;

    const timer = setTimeout(() => {
      setRecentCaptureIndex(null);
    }, 600);

    return () => clearTimeout(timer);
  }, [recentCaptureIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => clearInterval(timer);
  }, []);

  const joinGame = useCallback((username) => {
    setJoinError("");
    socketRef.current?.emit(SOCKET_EVENTS.USER_JOIN, { username });
  }, []);

  const captureCell = useCallback(
    (cellIndex) => {
      if (!currentUser) {
        setJoinError("Join with a username before capturing cells");
        return;
      }

      if (!isConnected) {
        setCaptureError("Connection lost. Reconnecting...");
        return;
      }

      const cell = cells[cellIndex];
      const cooldownUntilTime = cooldownUntil
        ? new Date(cooldownUntil).getTime()
        : 0;

      if (cooldownUntilTime > Date.now()) {
        setCaptureError("Capture cooldown is active");
        return;
      }

      if (!cell || cell.ownerName) {
        return;
      }

      setCaptureError("");
      setPendingCell(cellIndex);
      socketRef.current?.emit(SOCKET_EVENTS.CELL_CAPTURE, { cellIndex });
    },
    [cells, cooldownUntil, currentUser, isConnected]
  );

  const cooldownRemainingMs = cooldownUntil && now
    ? Math.max(0, new Date(cooldownUntil).getTime() - now)
    : 0;

  return {
    cells,
    stats,
    leaderboard,
    activities,
    onlineUsers,
    currentUser,
    isLoading,
    isConnected,
    joinError,
    captureError,
    pendingCell,
    recentCaptureIndex,
    cooldownRemainingMs,
    now,
    joinGame,
    captureCell,
  };
}
