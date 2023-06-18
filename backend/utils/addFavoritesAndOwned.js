const Truck = require("../models/Truck");
const UserFavoriteTruck = require("../models/UserFavoriteTruck");
const addTruckRatings = require("./addTruckRatings");
const addMenuItems = require("./addMenuItems");

const addFavoritesAndOwned = async (user) => {

  if (user.user_role === "operator") {
    console.log("OPERATOR ASKING FOR SELF ITEMS");
    user.ownedTrucks = await Truck.find({ operator_id: user.id });
    // await addTruckRatings(user.ownedTrucks, user.id);
    await addMenuItems(user.ownedTrucks);
  }

  if (user.user_role === "diner") {
    const favorites = await UserFavoriteTruck.findAllByUserId(user.id);
    const promises = favorites.map((x) => Truck.findById(x.truck_id));
    const returningTrucks = await Promise.all(promises);
    user.favoriteTrucks = returningTrucks;
    await addTruckRatings(user.favoriteTrucks, user.id);
    // await addMenuItems(user.favoriteTrucks);
  }
  return user;
};
module.exports = addFavoritesAndOwned;
