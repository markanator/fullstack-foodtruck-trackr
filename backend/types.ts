import type { Role, Truck, User } from "@prisma/client";
import { Request } from "express";

export type ReqWithUser = Request & {
  user?: User & { roles: Role[] };
  truck?: Truck;
};
