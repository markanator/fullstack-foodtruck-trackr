import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { findByEmail, findByUsername } from "../models/User";

const createUserRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const required = ["username", "password", "email", "user_role"];
    for (const requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    req.body.user_role = req.body.user_role.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    if (req.body.user_role !== "operator" && req.body.user_role !== "user") {
      return res
        .status(400)
        .json({ error: "User role must be operator or user" });
    }
    const emailUser = await findByEmail(req.body.email);
    const usernameUser = await findByUsername(req.body.username);
    if (emailUser) {
      return res
        .status(400)
        .json({ error: "Account with that email already exists" });
    }
    if (usernameUser) {
      return res
        .status(400)
        .json({ error: "Account with that username already exists" });
    }
    const hash = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hash;
    next();
  } catch (error: any) {
    console.log(error?.message);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

export default createUserRequirements;
