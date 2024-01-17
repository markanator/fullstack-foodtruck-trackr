/// <reference types="lucia" />
declare namespace Lucia {
  // @ts-ignore
	type Auth = import("./lub/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
		firstName: string;
		lastName: string;
		roles: string[];
	};
	type DatabaseSessionAttributes = {};
}