const { io } = require("socket.io-client");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

const runSocketTest = async () => {
  console.log("Connecting to", SERVER_URL);

  const gridResponse = await fetch(`${SERVER_URL}/api/grid`);
  const gridData = await gridResponse.json();
  const openCell = gridData.cells.find((cell) => !cell.ownerName);
  const secondOpenCell = gridData.cells.find(
    (cell) => !cell.ownerName && cell.index !== openCell?.index
  );

  if (!openCell || !secondOpenCell) {
    throw new Error("Not enough open cells available for socket capture test");
  }

  const userA = io(SERVER_URL, { transports: ["websocket"] });
  const userB = io(SERVER_URL, { transports: ["websocket"] });
  const suffix = Date.now().toString(36);

  const waitFor = (socket, event) =>
    new Promise((resolve) => {
      socket.once(event, resolve);
    });

  const waitForOnlineCount = (socket, expectedCount) =>
    new Promise((resolve) => {
      const handler = (payload) => {
        if (payload.count >= expectedCount) {
          socket.off("online:update", handler);
          resolve(payload);
        }
      };

      socket.on("online:update", handler);
    });

  await Promise.all([
    waitFor(userA, "connect"),
    waitFor(userB, "connect"),
  ]);

  console.log("Both sockets connected");

  const joinedAPromise = waitFor(userA, "user:joined");
  const joinedBPromise = waitFor(userB, "user:joined");
  const onlinePromise = waitForOnlineCount(userA, 2);

  userA.emit("user:join", { username: `Alice-${suffix}` });
  userB.emit("user:join", { username: `Bob-${suffix}` });

  const [joinedA, joinedB, onlineUpdate] = await Promise.all([
    joinedAPromise,
    joinedBPromise,
    onlinePromise,
  ]);

  console.log("User A joined:", joinedA);
  console.log("User B joined:", joinedB);
  console.log("Online count:", onlineUpdate.count);

  const cellIndex = openCell.index;
  const capturePromise = waitFor(userA, "cell:capture:result");
  const broadcastPromise = waitFor(userB, "cell:update");

  userA.emit("cell:capture", { cellIndex });

  const [captureResult, broadcastUpdate] = await Promise.all([
    capturePromise,
    broadcastPromise,
  ]);

  console.log("Capture result (Alice):", captureResult);
  console.log("Broadcast update (Bob):", broadcastUpdate.cell?.index);

  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });

  userA.emit("cell:capture", { cellIndex: secondOpenCell.index });
  const cooldownResult = await waitFor(userA, "cell:capture:result");

  if (cooldownResult.success) {
    throw new Error("Cooldown was not enforced for consecutive captures");
  }

  console.log("Cooldown result (Alice):", cooldownResult.message);

  userB.emit("cell:capture", { cellIndex });
  const conflictResult = await waitFor(userB, "cell:capture:result");

  console.log("Conflict result (Bob):", conflictResult);

  userA.close();
  userB.close();

  console.log("Socket tests passed");
  process.exit(0);
};

runSocketTest().catch((error) => {
  console.error("Socket test failed:", error);
  process.exit(1);
});
