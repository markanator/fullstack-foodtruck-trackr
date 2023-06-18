import { Response } from "express";
import { ReqWithUser } from "../types";
import prisma from "../data/db.server";
import addFavoritesAndOwned from "../utils/addFavoritesAndOwned";
import createToken from "../utils/createToken";
import jwt from "jsonwebtoken";

export const register = async (req: ReqWithUser, res: Response) => {
  try {
    const {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      user_role,
    } = req.body as any;
    const user = await prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password: {
          create: {
            hash: password,
          },
        },
        roles: {
          connect: {
            name: user_role || "user",
          },
        },
      },
      include: {
        roles: true,
      },
    });
    const token = await createToken(user);
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
    await addFavoritesAndOwned(req.user as any);
    return res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export const me = async (req: ReqWithUser, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export const logout = async (_: ReqWithUser, res: Response) => {
  try {
    const token = jwt.sign({}, process.env.SECRET_JWT!, { expiresIn: "1ms" });
    return res.status(200).json({ message: "Logged out", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
