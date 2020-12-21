/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';

// create Context
const LoggedUserContext = createContext({});

// export context hook
export const useUserContext = () => useContext(LoggedUserContext);

const initialUserState = {
  isOnline: false,
  userInfo: {
    id: 2,
    username: '',
    email: '',
    first_name: null,
    last_name: null,
    user_role: 'diner',
    avatar_url: null,
    favoriteTrucks: [],
  },
  token: '',
};

export default function UserProvider({ children }) {
  const [userState, setUserState] = useState(initialUserState);

  const UserExports = {
    userState,
    setUserState,
  };

  return (
    <LoggedUserContext.Provider value={UserExports}>
      {children}
    </LoggedUserContext.Provider>
  );
}
