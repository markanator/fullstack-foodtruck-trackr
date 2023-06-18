import { NextFunction, Request, Response } from "express";

const Truck = require("../models/Truck");

const validateTruck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const truck = await Truck.findById(id);
    console.log("👍 TRUCK FOUND");
    if (!truck)
      return res.status(404).json({ error: "No truck found with this id" });
    // @ts-ignore
    req.truck = truck;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error trying to find truck" });
  }
};

export default validateTruck;
