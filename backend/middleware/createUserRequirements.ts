import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { findByUsername } from "../models/User.js";

const createUserRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const required = ["username", "password", "email"];
    for (const requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    req.body.user_role = "user"
    req.body.email = req.body.email.toLowerCase();

    const usernameUser = await findByUsername(req.body.username);
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
