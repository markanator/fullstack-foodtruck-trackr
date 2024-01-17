import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import path from "path";
import AuthRoutes from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import TruckRouter from "./routes/truck.js";

const server: Express = express();
const __prod__ = process.env.NODE_ENV === "production";

server.use(cors());
server.use(helmet());
server.use(compression());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

if (__prod__) {
  server.use(express.static(path.resolve(__dirname, "dist")));
}

server.use("/api/auth", AuthRoutes);
server.use("/api/users", UserRouter);
server.use("/api/trucks", TruckRouter);
server.get("/api/__health", (_, res) => {
  res.status(200).json({ message: "Server up." });
});

if (__prod__) {
  server.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

export default server;
