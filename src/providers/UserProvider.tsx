import { createContext, useEffect, useState } from "react";

import { UserModel } from "../models/user.model";
import axios from "axios";
import config from "../config";

type UserProviderProps = {
  children: React.ReactNode;
};

export type UserContextType = {
  users?: UserModel[];
  currentUser?: UserModel;
  setCurrentUser: (user: UserModel) => void;
};

export const UserContext = createContext<UserContextType>({
  users: undefined,
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<UserModel[]>();
  const [checkUsers, setCheckUsers] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserModel>();

  useEffect(() => {
    // kinda weird but mostly just for this example w/user switching
    const loadUsers = async () => {
      const response = await axios.get<UserModel[]>(`${config.API_URL}/api/v1/users`);

      if (response.status === 200) {
        setCheckUsers(false);

        response.data.length && setUsers(response.data);
        // response.data.length && setCurrentUser(response.data[0]);
      }
    };

    if (checkUsers && !users) {
      loadUsers();
    }
  }, [checkUsers, users]);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
