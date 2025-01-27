import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // console.log("Token stored in localStorage:", token);
    } else {
      localStorage.removeItem("token");
      // console.log("Token removed from localStorage");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, backendUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
