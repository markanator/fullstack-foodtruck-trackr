require('dotenv').config();

const baseURL = process.env.BASE_URL || "http://localhost:5000";

module.exports = {
  baseURL,
}