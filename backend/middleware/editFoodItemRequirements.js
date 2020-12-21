const editFoodItemRequirements = (req, res, next) => {
  req.foodItem = {
    item_name: req.body.item_name || req.food.item_name,
    item_description: req.body.item_description || req.food.item_description,
    item_price: req.body.item_price || req.item_price,
    item_photo: req.body.item_photo || req.item_photo,
  };
  next();
};

module.exports = editFoodItemRequirements;
