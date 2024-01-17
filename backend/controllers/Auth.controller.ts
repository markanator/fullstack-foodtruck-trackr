import { Request, Response } from "express";
import type { ReqWithUser } from "../types.js";
import addFavoritesAndOwned from "../utils/addFavoritesAndOwned.js";
import jwt from "jsonwebtoken";
import { auth } from "../lib/lucia.js";
import { LuciaError } from "lucia";

const PROVIDER_KEY = "email";

export const register = async (req: ReqWithUser, res: Response) => {
  try {
    const {
      email,
      username,
      password,
    } = req.body as any;
    const user = await auth.createUser({
			key: {
				providerId: PROVIDER_KEY, // auth method
				providerUserId: email, // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username,
        email,
        email_verified: false,
        roles: {
          connect: {
            name: "user",
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
		return res.status(201).json({ success: true, data: user.userId });
  } catch (error: any) {
    console.log(error);
    if (
			error instanceof LuciaError && error?.message === "AUTH_DUPLICATE_KEY_ID"
		) {
			return res.status(400).json({success: false, message:"Username and/or email already taken"});
		}
    return res.status(500).json({ success: false, message: "Server is malfunctioning" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const {email, password} = req.body;
		const key = await auth.useKey(PROVIDER_KEY, email, password);
    console.log({key})
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {}
		});
    console.log({session})
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
    return res.status(200).json({ success: true, data: session?.user });
  } catch (e: any) {
    console.log(e);
    // check for unique constraint error in user table
		if (
			e instanceof LuciaError &&
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			return res.status(400).json({success: false, message: "Incorrect email or password"});
		}
    return res.status(500).json({ success: false, message: "Server is malfunctioning" });
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
