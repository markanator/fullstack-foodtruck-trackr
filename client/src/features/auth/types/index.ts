export type AuthUser = {
  id: string;
  username: string;
  email: string;
  email_verified: boolean;
  avatar: string;
  roles: { name: 'operator' | 'user' | 'admin' }[];
};

export type UserResponse = {
  token: string;
  user: AuthUser;
};
