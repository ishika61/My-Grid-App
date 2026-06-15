const { io } = require("socket.io-client");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

const runSocketTest = async () => {
  console.log("Connecting to", SERVER_URL);

  const userA = io(SERVER_URL, { transports: ["websocket"] });
  const userB = io(SERVER_URL, { transports: ["websocket"] });

  const waitFor = (socket, event) =>
    new Promise((resolve) => {
      socket.once(event, resolve);
    });

  await Promise.all([
    waitFor(userA, "connect"),
    waitFor(userB, "connect"),
  ]);

  console.log("Both sockets connected");

  userA.emit("user:join", { username: "Alice" });
  userB.emit("user:join", { username: "Bob" });

  const [joinedA, joinedB, onlineUpdate] = await Promise.all([
    waitFor(userA, "user:joined"),
    waitFor(userB, "user:joined"),
    waitFor(userA, "online:update"),
  ]);

  console.log("User A joined:", joinedA);
  console.log("User B joined:", joinedB);
  console.log("Online count:", onlineUpdate.count);

  const cellIndex = 42;
  const capturePromise = waitFor(userA, "cell:capture:result");
  const broadcastPromise = waitFor(userB, "cell:update");

  userA.emit("cell:capture", { cellIndex });

  const [captureResult, broadcastUpdate] = await Promise.all([
    capturePromise,
    broadcastPromise,
  ]);

  console.log("Capture result (Alice):", captureResult);
  console.log("Broadcast update (Bob):", broadcastUpdate.cell?.index);

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
