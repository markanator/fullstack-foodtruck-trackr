import { NextFunction, Request, Response } from "express";
import prisma from "../data/db.server.js";
import { baseURL } from "../utils/helpers.js";
import * as Truck from "../models/Truck.js";

const paginatedTruckResults = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: Record<string, unknown> = {};

    const count = await prisma.truck.count();
    const pages = Math.ceil(count / limit);

    results.info = {
      totalTrucks: count,
      maxPages: pages,
      next: page >= pages ? null : `${baseURL}/trucks?page=${page + 1}`,
      prev: page < 2 ? null : `${baseURL}/trucks?page=${page - 1}`,
    };

    try {
      results.trucks = await Truck.fetchAll();
      // @ts-ignore
      res.paginatedResults = results;
      next();
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
};

export default paginatedTruckResults;
