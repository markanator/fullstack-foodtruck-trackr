const knex = require("knex");
const knexPostgis = require("knex-postgis");

const config = require("../knexfile");

const env = process.env.DB_ENV || "development";

module.exports = knex(config[env]);
