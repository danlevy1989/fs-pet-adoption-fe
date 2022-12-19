import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import React, { useEffect } from "react";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser])
  

  return currentUser && <Outlet />;
}