import { NextFunction, Response } from "express";
import { ReqWithUser } from "../types";
import { findByEmail, findByUsername } from "../models/User";

const editUserRequirements = async (
  req: ReqWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.username) {
      const user = await findByUsername(req.body.username);
      if (user && user.id !== req.user!.id) {
        return res
          .status(400)
          .json({ error: "User with that username already exist" });
      }
    }
    if (req.body.email) {
      const email = await findByEmail(req.body.email);
      if (email && email.id !== req.user!.id) {
        return res
          .status(400)
          .json({ error: "User with that email already exist" });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

export default editUserRequirements;
