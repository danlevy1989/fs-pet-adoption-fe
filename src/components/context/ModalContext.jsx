import React from "react";
import { createContext, useContext } from "react";
import { useState } from "react";

export const ModalContext = createContext({});

export function useModalContext() {
  return useContext(ModalContext);
}

export default function ModalContextProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setopenSignUpModal] = useState(false);
  const handleOpenLogin = () => setOpenLoginModal(true);
  const handleCloseLogin = () => setOpenLoginModal(false);
  const handleOpenSignUp = () => setopenSignUpModal(true);
  const handleCloseSignUp = () => setopenSignUpModal(false);

  return (
    <ModalContext.Provider value={{ openLoginModal, openSignUpModal, handleOpenLogin, handleCloseLogin, handleOpenSignUp, handleCloseSignUp }}>
      {children}
    </ModalContext.Provider>
  );
}
