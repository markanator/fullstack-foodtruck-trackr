import {lucia} from "lucia";
import { express } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
	env: process.env.NODE_ENV === "production"? "PROD":"DEV",
	middleware: express(),
  adapter: prisma(client),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
