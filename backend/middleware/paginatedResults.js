const Truck = require('../models/Truck');
const prisma = require("../data/db.server");
const { baseURL } = require('../utils/helpers');

const paginatedTruckResults = () => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    const count = await prisma.truck.count();
    const pages = Math.ceil(parseInt(count) / limit)

    results.info = {
      totalTrucks: parseInt(count),
      maxPages: pages,
      next: page >= pages ? null : `${baseURL}/trucks?page=${page + 1}`,
      prev: page < 2 ? null : `${baseURL}/trucks?page=${page - 1}`,
    }

    try {
      results.trucks = await Truck.fetchAll();
      res.paginatedResults = results;
      next();
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = paginatedTruckResults;
