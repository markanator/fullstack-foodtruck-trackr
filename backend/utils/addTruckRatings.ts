import * as TruckRating from "../models/TruckRating.js";

const addTruckRatings = async (trucks: any[], userId: string) => {
  // if (trucks.length < 0 || trucks === undefined){
  //   return;
  // }
  for (let i = 0; i < trucks.length; i++) {
    if (userId) {
      const userRating = await TruckRating.find(userId, trucks[i].id);
      trucks[i].userRating = userRating ? userRating.rating : null;
    }
    const reviews = await TruckRating.findByTruckId(trucks[i].id);
    const truckReviews = reviews.map((x) => x.rating);
    const average = Math.round(
      truckReviews.reduce((acc, c) => {
        return (acc += c);
      }, 0) / truckReviews.length
    );

    trucks[i].averageRating = average;
  }
};
export default addTruckRatings;
