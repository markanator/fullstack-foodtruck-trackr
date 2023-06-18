import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { findByEmail } from "../models/User";

const loginRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Missing email or password" });

  const user = await findByEmail(req.body.email);
  if (!user) return res.status(401).json({ error: "No user with this email" });
  const result = bcrypt.compare(req.body.password, user.password);
  if (!result) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  // @ts-ignore
  req.user = user;
  next();
};
export default loginRequirements;
