import { NextFunction, Request, Response } from "express";
import * as Truck from "../models/Truck";
import * as FoodItem from "../models/FoodItem";

const validateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodID } = req.params;
    const food = await FoodItem.findById(foodID);
    if (!food) {
      return res
        .status(404)
        .json({ error: "Menu Item not found with that id" });
    }
    const truck = await Truck.findById(food.id);
    if (!truck) {
      return res.status(404).json({ error: "Truck not found with that id" });
    }
    // @ts-ignore
    req.truck = truck;
    // @ts-ignore
    req.food = food;
    // pass it on
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error with Menu Item" });
  }
};

export default validateFood;
