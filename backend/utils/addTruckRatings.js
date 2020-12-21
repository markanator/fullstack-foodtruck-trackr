const TruckRating = require("../models/TruckRating");

const addTruckRatings = async (trucks, userId) => {
  // if (trucks.length < 0 || trucks === undefined){
  //   return;
  // }
  for (let i = 0; i < trucks.length; i++) {
    if (userId) {
      const userRating = await TruckRating.find(userId, trucks[i].id);
      trucks[i].userRating = userRating ? userRating.rating : null;
    }
    let average = await TruckRating.findByTruckId(trucks[i].id);
    average = average.map((x) => x.rating);
    average = Math.round(
      average.reduce((acc, c) => {
        return (acc += c);
      }, 0) / average.length
    );

    trucks[i].averageRating = average;
  }
};
module.exports = addTruckRatings;
