import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/AuthContext";
import MyPetsList from "../MyPetsList";
import { useGeneralContext } from "../context/GeneralContext";

export default function MyPets() {
  const { setUserPets, userPets, getPetsByUserId } = useGeneralContext();
  const { currentUser, token } = useAuthContext();

  const showUserPets = async () => {
    const res = await getPetsByUserId(currentUser._id, token);
    if (res) {
      setUserPets(res);
    }
  };

  useEffect(() => {
    showUserPets();
  }, [currentUser.petsSaved]);

  return (
    <div className="dashBoardContainer">
      <Typography
        sx={{ mt: 10, mb: 5 }}
        display="inline"
        component="h1"
        variant="h3"
        fontWeight={600}
        color="rgb(4, 3, 47)"
      >
        My Pets
      </Typography>

      {userPets && <MyPetsList userPets={userPets} />}
    </div>
  );
}
