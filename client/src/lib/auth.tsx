import { Spinner } from "@chakra-ui/react";
import { configureAuth } from "react-query-auth";
import {
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  UserResponse,
  getUser,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "~/features/auth";
import storage from "~/utils/storage";

async function handleUserResponse(data: UserResponse) {
  const { token, user } = data;
  storage.setToken(token);
  return user;
}

async function userFn() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
  AuthLoader: () => {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthLoader, useLogin, useLogout, useRegister, useUser } =
  configureAuth(authConfig);
