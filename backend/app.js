const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/user");
const TruckRouter = require("./routes/truck");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
if (process.env.NODE_ENV !== "production") {
  server.use(morgan("dev"));
}

server.use("/users", UserRouter);
server.use("/trucks", TruckRouter);

server.get("/health", (req, res) => {
  res.status(200).json({ message: "Server up." });
});

module.exports = server;
