import axios from "~/axios";

import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/auth/register", data);
};
