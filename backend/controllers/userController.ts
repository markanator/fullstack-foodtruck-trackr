import type { Response } from "express";
import * as User from "../models/User.js";
import addFavoritesAndOwned from "../utils/addFavoritesAndOwned.js";
import addTotalTruckViews from "../utils/addTotalViews.js";
import addTotalTruckReviews from "../utils/addTotalTruckReviews.js";
import { ReqWithUser } from "../types.js";

export const getUser = async (req: ReqWithUser, res: Response) => {
  await addTotalTruckViews(req.user!);
  await addTotalTruckReviews(req.user!);
  await addFavoritesAndOwned(req.user!);
  return res.status(200).json(req.user);
};

export const editUser = async (req: ReqWithUser, res: Response) => {
  try {
    if (!req?.body || !Object.keys(req?.body ?? {}).length)
      return res.status(400).json({ error: "No body provided" });
    const { username, email, first_name, last_name } = req.body as any;
    const edit = {
      username: username || req?.user?.username,
      email: email || req?.user?.email,
      firstName: first_name || req?.user?.firstName,
      lastName: last_name || req?.user?.lastName,
      // avatarId: req.body.avatar_url || req.user.avatar_url,
    };
    const user = await User.update(edit, req.user!.id);
    await addFavoritesAndOwned(user as any);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
export const deleteUser = async (req: ReqWithUser, res: Response) => {
  try {
    await User.remove(req.user!.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
