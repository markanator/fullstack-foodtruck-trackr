require('dotenv').config();

const baseURL = process.env.CORS_URL || "http://localhost:3000";

module.exports = {
  baseURL,
}