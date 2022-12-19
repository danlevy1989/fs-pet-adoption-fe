import React, { useState } from "react";
import MyPetCard from "./MyPetCard";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";

export default function MyPetsList({ userPets }) {
  const [isOwnedList, setIsOwnedList] = useState(true);
  const [alignment, setAlignment] = useState("users");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setIsOwnedList(!isOwnedList);
  };

 
  return (
    <>
      <ToggleButtonGroup
        sx={{ display: "flex", justifyContent: "center", mb: 4 }}
        size="large"
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton disabled={isOwnedList} value="users">
          My Owned Pets
        </ToggleButton>
        <ToggleButton disabled={!isOwnedList} value="pets">
          WishList
        </ToggleButton>
      </ToggleButtonGroup>

      <Grid
        sx={{ ml: 13 }}
        justifyContent="center"
        width="100vh"
        container
        spacing={5}
      >
        {!isOwnedList &&
          userPets.petsSaved &&
          userPets.petsSaved.map((myPetCard) => (
            <MyPetCard key={uuidv4()} myPetCard={myPetCard} />
          ))}

{!isOwnedList && userPets.petsSaved.length === 0 && <Typography sx={{mt: 4, mr: 4}}>Your Wishlist is Empty.</Typography>}

        {isOwnedList &&
          userPets.petsOwned &&
          userPets.petsOwned.map((myPetCard) => (
            <MyPetCard key={uuidv4()} myPetCard={myPetCard} />
          ))}

        {isOwnedList && userPets.petsOwned.length === 0 && <Typography sx={{mt: 4, mr: 4}}>You Currently do not own any pets.</Typography>}


      </Grid>
    </>
  );
}
