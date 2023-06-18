const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/user");
const TruckRouter = require("./routes/truck");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const server = express();
const __prod__ = process.env.NODE_ENV === "production";

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

if (__prod__) {
  server.use(express.static(path.resolve(__dirname, "dist")));
}

server.use("/api/users", UserRouter);
server.use("/api/trucks", TruckRouter);
server.get("/api/__health", (req, res) => {
  res.status(200).json({ message: "Server up." });
});

if (__prod__) {
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

module.exports = server;
