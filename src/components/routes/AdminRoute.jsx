import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import React, { useEffect } from "react";

export default function AdminRoute() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      navigate("/");
    }
  }, [currentUser.isAdmin])
  

  return currentUser && <Outlet />;
}