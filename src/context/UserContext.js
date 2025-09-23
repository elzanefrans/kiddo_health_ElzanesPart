import React, { createContext, useState, useContext } from "react";

// Create Context
const UserContext = createContext();

// Custom hook to access the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);   // logged in user (parent or doctor)
  const [child, setChild] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, child, setChild }}>

      {children}
    </UserContext.Provider>
  );
};
