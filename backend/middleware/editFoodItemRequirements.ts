import { NextFunction, Request, Response } from "express";

const editFoodItemRequirements = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  // @ts-ignore
  req.foodItem = {
    // @ts-ignore
    item_name: req.body.item_name || req.food.item_name,
    // @ts-ignore
    item_description: req.body.item_description || req.food.item_description,
    // @ts-ignore
    item_price: req.body.item_price || req.item_price,
    // @ts-ignore
    item_photo: req.body.item_photo || req.item_photo,
  };
  next();
};

export default editFoodItemRequirements;
