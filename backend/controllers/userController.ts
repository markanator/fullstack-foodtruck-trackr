import { RequireAuthProp } from '@clerk/clerk-sdk-node';
import type { Response, Request } from 'express';
import * as User from '../models/User.js';
import addFavoritesAndOwned from '../utils/addFavoritesAndOwned.js';
import addTotalTruckViews from '../utils/addTotalViews.js';
import addTotalTruckReviews from '../utils/addTotalTruckReviews.js';
import { ReqWithUser } from '../types.js';

export const getUser = async (req: RequireAuthProp<Request>, res: Response) => {
  let user = await User.findById(req.auth?.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await addTotalTruckViews(user);
  await addTotalTruckReviews(user);
  await addFavoritesAndOwned(user);
  return res.status(200).json(user);
};
