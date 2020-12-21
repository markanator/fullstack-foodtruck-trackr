const TruckRating = require("../models/TruckRating");
const FoodItem = require("../models/FoodItem");

const addMenuItems = async (trucks) => {
  for (let i = 0; i < trucks.length; i++) {
    trucks[i].foodItems = await FoodItem.findAllByTruckId(trucks[i].id);
  }
};
module.exports = addMenuItems;
