import { NextFunction, Request, Response } from "express";

const createMenuItemRequirements = async (
  req: Request & { truck?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const required = [
      "item_name",
      "item_description",
      "item_photo",
      "item_price",
    ];
    for (const requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    // @ts-ignore
    if (req.user.id !== req.truck.operator_id) {
      return res
        .status(401)
        .json({ error: "Must be the owner to add a menu item" });
    }
    // @ts-ignore
    req.foodItem = {
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_photo: req.body.item_photo,
      item_price: req.body.item_price,
      truck_id: req.truck!.id,
    };
    // pass it on
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating the menu item." });
  }
};

export default createMenuItemRequirements;
