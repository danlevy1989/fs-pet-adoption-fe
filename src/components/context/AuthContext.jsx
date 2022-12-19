import React from "react";
import { createContext, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const tokenFromStorage = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(tokenFromStorage || false);
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(userFromStorage || false);

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    navigate("/");
    toast.error("Token expired please Login again.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, setCurrentUser, currentUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
