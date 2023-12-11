// context/UserContext.js

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    loggedIn: false,
  });

  const loginUser = (username) => {
    setUser({ username, loggedIn: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("userName", username);
    }
  };

  const logoutUser = () => {
    setUser({ username: "", loggedIn: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("userName");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("userName") || "";
      setUser({ username: storedUsername, loggedIn: !!storedUsername });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
