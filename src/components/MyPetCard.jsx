import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

import { useAuthContext } from "./context/AuthContext";
import { useGeneralContext } from "./context/GeneralContext";

export default function MyPetCard({ myPetCard }) {
  const { userPets, getPetById, savePet, removeSavedPet } = useGeneralContext();
  const { currentUser, token, setCurrentUser, logOut } = useAuthContext();
  const { _id } = myPetCard;
  const startState = userPets.petsSaved?.find((item) => item._id === _id);
  const [isSavedByUser, setIsSavedByUser] = useState(startState);
  const [myCurrentPet, setMyCurrentPet] = useState({});
  let navigate = useNavigate();

  const handleShowPet = () => {
    navigate(`/petPage/${_id}`);
  };

  const getCurrentPet = async () => {
    const res = await getPetById(_id, token);
    if (res) {
      setMyCurrentPet(res);
    }
  };

  useEffect(() => {
    getCurrentPet();
  }, []);

  const handleSavePet = async () => {
    const res = await savePet(_id, null, token);
    if (res) {
      setIsSavedByUser(true);
      setCurrentUser(res);
    }
  };

  const handleRemoveSavedPet = async () => {
    const res = await removeSavedPet(_id, token);
    if (res) {
      setIsSavedByUser(false);
      setCurrentUser(res);
    }
  };

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card>
        <Typography
          sx={{
            mt: 0.5,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-around",
          }}
          gutterBottom
          variant="h6"
          component="h2"
        >
          {myCurrentPet.name}, {myCurrentPet.type}
          {currentUser && isSavedByUser && (
            <IconButton
              onClick={handleRemoveSavedPet}
              sx={{ bottom: 4, ml: 3 }}
            >
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
          )}
          {currentUser && !isSavedByUser && (
            <IconButton onClick={handleSavePet} sx={{ bottom: 4, ml: 3 }}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </Typography>

        <CardMedia
          sx={{ maxHeight: "25vh", minHeight: "25vh" }}
          component="img"
          image={myCurrentPet.imageUrl}
          alt="NO IMAGE"
        />
        <CardContent></CardContent>
        <CardActions sx={{ justifyContent: "space-Between" }}>
          <Button
            sx={{ textTransform: "none" }}
            onClick={handleShowPet}
            size="small"
          >
            More info
          </Button>
          {myCurrentPet.adoptionStatus === "Available" ? (
            <Button
              sx={{
                backgroundColor: "green",
                cursor: "default",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              variant="contained"
              size="small"
            >
              {myCurrentPet.adoptionStatus}
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: "red",
                cursor: "default",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              variant="contained"
              size="small"
            >
              {myCurrentPet.adoptionStatus}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
