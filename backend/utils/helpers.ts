import { config } from "dotenv";
config();

export const baseURL = process.env.CORS_URL || "http://localhost:3000";
