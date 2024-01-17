/// <reference types="lucia" />
declare namespace Lucia {
  // @ts-ignore
	type Auth = import("./lub/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
		email: string;
		email_verified: boolean;
		roles: string[];
	};
	type DatabaseSessionAttributes = {};
}