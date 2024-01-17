import { User } from '@prisma/client';
import { findRatingsByUserID } from '../models/TruckRating.js';

const addTotalTruckReviews = async (user: User & { roles: { name: string }[] }) => {
  if (user?.roles?.some((r) => r.name === 'operator')) {
    const trucks = await findRatingsByUserID(user.id);
    // @ts-ignore
    user.totalTruckReviews = trucks.length;
  }

  return user;
};
export default addTotalTruckReviews;
