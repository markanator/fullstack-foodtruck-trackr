import { User } from "@prisma/client";
import { findRatingsByUserID } from "../models/TruckRating";

const addTotalTruckReviews = async (
  user: User & { role: { name: string } }
) => {
  if (user.role.name === "operator") {
    const trucks = await findRatingsByUserID(user.id);
    // @ts-ignore
    user.totalTruckReviews = trucks.length;
  }

  return user;
};
export default addTotalTruckReviews;
