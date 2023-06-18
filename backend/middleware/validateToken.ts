import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import * as User from "../models/User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const tokenFromClient = authorization?.split("Bearer ")[1];
    if (!authorization || !tokenFromClient) {
      return res.status(401).json({ error: "Not Authorized - No token" });
    }
    jwt.verify(
      tokenFromClient,
      process.env.SECRET_JWT!,
      undefined,
      async function (err, decoded) {
        if (err || !decoded?.sub) {
          return res.status(401).json({ error: "Not Authorized - No token" });
        }
        console.log({ decoded });
        const user = await User.findById(decoded.sub as string);
        if (!user)
          return res.status(404).json({ error: "User no longer exists" });
        // @ts-ignore
        req.user = user;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

export default validateToken;
