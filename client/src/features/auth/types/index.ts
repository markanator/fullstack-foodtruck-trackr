export type AuthUser = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: { name: "operator" | "user" | "admin" };
};

export type UserResponse = {
  token: string;
  user: AuthUser;
};
