import { NextFunction, Request, Response } from "express";
import slugify from "slugify";

const editTruckRequirements = (
  req: Request & { truck?: any },
  res: Response,
  next: NextFunction
) => {
  if (!Object.keys(req.body as any).length) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const {
    name,
    hero_image,
    description,
    cuisine_type,
    price_range,
    // address,
    // departure_time,
    // arrival_time,
  } = req.body as any;
  const slug = slugify.default(name || req.truck.name);
  // @ts-ignore
  req.truckData = {
    name: name || req.truck.name,
    slug,
    photoId: hero_image || req.truck.hero_image,
    description: description || req.truck.description,
    cuisineType: cuisine_type || req.truck.cuisine_type,
    priceRange: price_range || req.truck.price_range,
  };
  next();
};

export default editTruckRequirements;
