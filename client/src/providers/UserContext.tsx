/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";

// create Context
interface LoggedUserContext {
  isOnline: boolean;
  userInfo?: {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    role: { name: string };
    avatar_url?: string;
    favoriteTrucks: never[];
  };
  token?: string;
  setUserState: (arg: any) => void;
}
const LoggedUserContext = createContext<LoggedUserContext>({
  isOnline: false,
  setUserState: () => {},
});

// export context hook
export const useUserContext = () => useContext(LoggedUserContext);

const initialUserState = {
  isOnline: false,
  userInfo: {
    id: 2,
    username: "",
    email: "",
    first_name: null,
    last_name: null,
    user_role: "diner",
    avatar_url: null,
    favoriteTrucks: [],
  },
  token: "",
};

export default function UserProvider({ children }: any) {
  const [userState, setUserState] = useState(initialUserState);

  const UserExports = {
    ...userState,
    setUserState,
  };

  return (
    <LoggedUserContext.Provider value={UserExports as any}>
      {children}
    </LoggedUserContext.Provider>
  );
}
