import { NextFunction, Response } from "express";
import { ReqWithUser } from "../types.js";
import slugify from "slugify";

const createTruckRequirements = async (
  req: ReqWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const required = [
      "name",
      "description",
      "cuisine_type",
      "price_range",
      "arrival_time",
      "departure_time",
      "address",
      "lng",
      "lat",
    ];
    for (const requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    if (req.user!.roles?.some(s => s.name !== "operator")) {
      return res.status(400).json({ error: "User must be an operator" });
    }
    const truckName = req.body.name.toLowerCase();
    const slug = slugify.default(truckName);
    // @ts-ignore
    req.truckData = {
      name: truckName,
      slug,
      hero_image: req.body.hero_image || null,
      cuisine_type: req.body.cuisine_type.toLowerCase() || null,
      description: req.body.description.toLowerCase() || null,
      price_range: req.body.price_range || null,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      address: req.body.address,
      operator_id: req.user!.id,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error Creating Truck..." });
  }
};

export default createTruckRequirements;
