import React from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const GeneralContext = createContext({});

export function useGeneralContext() {
  return useContext(GeneralContext);
}

export default function GeneralContextProvider({ children }) {
  const { logOut } = useAuthContext();
  const [userPets, setUserPets] = useState("");

  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastSuccses = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const petAdoptionApi = axios.create({
    baseURL: "http://localhost:8080",
  });

  const addPet = async (petData, token) => {
    try {
      const res = await petAdoptionApi.post("/pet", petData, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getPetById = async (petId, token) => {
    try {
      const res = await petAdoptionApi.get(`/pet/${petId}`, {
        headers: { authorization: `bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      }
    }
  };

  const updatePetById = async (petId, petData, token) => {
    try {
      const res = await petAdoptionApi.put(`/pet/${petId}`, petData, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getAllPets = async (token) => {
    try {
      const res = await petAdoptionApi.get("/pet", {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getPetsBySearch = async (searchQuery) => {
    try {
      const res = await petAdoptionApi.get("/pet", {
        params: searchQuery,
      });
      return res.data;
    } catch (err) {
      if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getPetsByUserId = async (userId, token) => {
    try {
      const res = await petAdoptionApi.get(`/pet/user/${userId}`, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const adoptOrFosterPet = async (petId, action, token) => {
    try {
      const res = await petAdoptionApi.post(`pet/${petId}/adopt`, action, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const returnPet = async (petId, currentUser, token) => {
    try {
      const res = await petAdoptionApi.post(
        `pet/${petId}/return`,
        currentUser,
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const savePet = async (petId, data, token) => {
    try {
      const res = await petAdoptionApi.post(`pet/${petId}/save`, data, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const removeSavedPet = async (petId, token) => {
    try {
      const res = await petAdoptionApi.delete(`pet/${petId}/save`, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getAllUsers = async (token) => {
    try {
      const res = await petAdoptionApi.get("/user", {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const getUserById = async (userId) => {
    try {
      const res = await petAdoptionApi.get(`/user/${userId}`);
      return res.data;
    } catch (err) {
      toastError(err.message);
    }
  };

  const getFullUserById = async (userId, token) => {
    try {
      const res = await petAdoptionApi.get(`/user/${userId}/full`, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  const updateUserById = async (userId, userData, token) => {
    try {
      const res = await petAdoptionApi.put(`/user/${userId}`, userData, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err.response.data === "Unauthorized") {
        logOut();
      } else if (err.response.data) {
        toastError(err.response.data);
      } else {
        toastError(err.message);
      }
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        userPets,
        toastError,
        toastSuccses,
        setUserPets,
        addPet,
        getPetById,
        updatePetById,
        getAllPets,
        getAllUsers,
        getPetsBySearch,
        getUserById,
        getFullUserById,
        updateUserById,
        getPetsByUserId,
        adoptOrFosterPet,
        returnPet,
        savePet,
        removeSavedPet,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
