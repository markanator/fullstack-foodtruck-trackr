import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../data/db.server";

const loginRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    include: { password: true },
  });
  if (!user || !user.password) {
    return res.status(401).json({ error: "No user with this email" });
  }
  const result = await bcrypt.compare(req.body.password, user.password.hash);
  if (!result) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  const { password, ...rest } = user;
  // @ts-ignore
  req.user = rest;
  next();
};
export default loginRequirements;
