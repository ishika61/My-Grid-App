require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const apiRoutes = require("./routes");
const initializeGrid = require("./services/gridInitService");
const { initializeSocket } = require("./socket");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Grid App Server Running");
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await initializeGrid();

  const server = http.createServer(app);

  initializeSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error.message);
  process.exit(1);
});

module.exports = app;
