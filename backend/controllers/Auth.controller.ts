import { Response } from "express";
import type { ReqWithUser } from "../types.js";
import addFavoritesAndOwned from "../utils/addFavoritesAndOwned.js";
import jwt from "jsonwebtoken";
import { auth } from "../lib/lucia.js";
import { LuciaError } from "lucia";

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
    const user = await auth.createUser({
			key: {
				providerId: "email", // auth method
				providerUserId: email, // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username,
        firstName,
        lastName,
        roles: {
          connect: {
            name: user_role || "user",
          },
        },
			}
		});
    const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		// redirect to profile page
		return res.status(201).json({ success: true, message: "User created" });
  } catch (error: any) {
    console.log(error);
    if (
			error instanceof LuciaError && error?.message === "AUTH_DUPLICATE_KEY_ID"
		) {
			return res.status(400).send("Username and/or email already taken");
		}
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export const loginUser = async (req: ReqWithUser, res: Response) => {
  try {
    // const token = await createToken(req.user!);
    // delete req.user.password;
    await addFavoritesAndOwned(req.user as any);
    return res.status(200).json({ user: req.user, token: "TOKEN" });
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
