import type { Response } from "express";
import * as User from "../models/User";
import createToken from "../utils/createToken";
import addFavoritesAndOwned from "../utils/addFavoritesAndOwned";
import addTotalTruckViews from "../utils/addTotalViews";
import addTotalTruckReviews from "../utils/addTotalTruckReviews";
import { ReqWithUser } from "../types";

export const registerUser = async (req: ReqWithUser, res: Response) => {
  try {
    const {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      user_role: role,
    } = req.body as any;
    const user = await User.insert({
      email,
      username,
      firstName,
      lastName,
      password,
      role,
    });
    const token = await createToken(user);
    delete user.password;
    await addFavoritesAndOwned(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export const loginUser = async (req: ReqWithUser, res: Response) => {
  try {
    const token = await createToken(req.user!);
    // delete req.user.password;
    await addFavoritesAndOwned(req.user!);
    return res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export const getUser = async (req: ReqWithUser, res: Response) => {
  // delete req.user.password;
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
    delete user.password;
    await addFavoritesAndOwned(user);
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
