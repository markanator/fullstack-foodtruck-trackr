const Truck = require("../models/Truck");
const totalReviews = require('../models/TruckRating');

const addTotalTruckReviews = async (user) => {

  if (user.user_role === "operator") {
    const trucks = await totalReviews.findRatingsByUserID(user.id);

    user.totalTruckReviews = trucks.length;
  }

  return user;
};
module.exports = addTotalTruckReviews;
