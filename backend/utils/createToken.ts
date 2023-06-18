import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const createToken = async (user: Pick<User, "id" | "email">) => {
  const token = jwt.sign(
    { sub: user.id, aud: user.email },
    process.env.SECRET_JWT!
  );
  return token;
};
export default createToken;
