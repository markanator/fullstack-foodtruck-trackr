const Truck = require("../models/Truck");
const FoodItem = require("../models/FoodItem");

const validateFood = async (req, res, next) => {
  try {
    const { foodID } = req.params;
    const food = await FoodItem.findById(foodID);
    if (!food)
      return res.status(404).json({ error: "Menu Item not found with that id" });

    const truck = await Truck.findById(food.truck_id);

    req.truck = truck;
    req.food = food;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error with Menu Item" });
  }
};

module.exports = validateFood;
