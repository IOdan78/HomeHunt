import React, { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  userRole: 'customer', 
  setUserRole: (role: string) => {},
});

export const useLogin = () => useContext(LoginContext);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || 'customer';
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}>
      {children}
    </LoginContext.Provider>
  );
};
