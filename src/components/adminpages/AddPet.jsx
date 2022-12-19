import React from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Hypoallergenic, PetTypes, AdopStatus } from "../models/Pet";
import { useAuthContext } from "../context/AuthContext";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";
import { useGeneralContext } from "../context/GeneralContext";

export default function AddPet() {
  const { toastSuccses, addPet } = useGeneralContext();
  const { token, currentUser } = useAuthContext();
  const [image, setImage] = useState("");

  const [details, setDetails] = useState({
    type: "",
    name: "",
    color: "",
    breed: "",
    adoptionStatus: "",
    height: "",
    weight: "",
    dietary: "",
    bio: "",
    hypoallergenic: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const petData = new FormData();
    for (let key in details) {
      petData.append(key, details[key]);
    }
    petData.append("petImage", image);

    const res = await addPet(petData, token);
    if (res) {
      setDetails({
        type: "",
        name: "",
        color: "",
        breed: "",
        adoptionStatus: "",
        height: "",
        weight: "",
        dietary: "",
        bio: "",
        hypoallergenic: false,
      });
      toastSuccses(res.message);
    }
  };

  return (
    <div className="addPetContainer">
      <div className="addPetSubContainer">
        <Typography
          sx={{ mb: 4 }}
          component="h1"
          variant="h3"
          fontWeight={600}
          align="center"
          color="rgb(4, 3, 47)"
          gutterBottom
        >
          Hey {currentUser.firstName}, Add a pet here:
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 4, width: "40ch" }}>
            <div>
              <TextField
                sx={{ mb: 2, width: "40ch" }}
                id="select-pet"
                select
                required
                label="Pet type"
                name="type"
                onChange={handleChange}
                value={details.type}
              >
                {PetTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <TextField
                sx={{ mb: 2, mr: 2, width: "19ch" }}
                id="pet-name"
                label="Name"
                name="name"
                required
                onChange={handleChange}
                value={details.name}
              ></TextField>
              <TextField
                sx={{ mb: 2, width: "19ch" }}
                id="color"
                label="Color"
                name="color"
                onChange={handleChange}
                value={details.color}
              ></TextField>
            </div>
            <div>
              <TextField
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="select-breed"
                label="Breed"
                name="breed"
                onChange={handleChange}
                value={details.breed}
              ></TextField>
            </div>

            <div>
              <TextField
                sx={{ mb: 2, mr: 2, width: "19ch" }}
                id="select-adoption-status"
                label="Status"
                select
                required
                name="adoptionStatus"
                onChange={handleChange}
                value={details.adoptionStatus}
              >
                {AdopStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{ mb: 2, width: "19ch" }}
                id="hypoallergenic "
                select
                label="Hypoallergenic"
                name="hypoallergenic"
                onChange={handleChange}
                value={details.hypoallergenic}
              >
                {Hypoallergenic.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                sx={{
                  mb: 2,
                  mr: 2,
                  width: "19ch",
                }}
                id="standard-basic"
                label="Height in CM"
                type="number"
                name="height"
                onChange={handleChange}
                value={details.height}
              />
              <TextField
                sx={{
                  mb: 2,
                  width: "19ch",
                }}
                id="standard-basic"
                label="Weight in KG"
                name="weight"
                onChange={handleChange}
                value={details.weight}
              />
            </div>

            <div>
              <TextField
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="dietary-restrictions"
                label="Dietary Restrictions"
                name="dietary"
                onChange={handleChange}
                value={details.dietary}
              ></TextField>
            </div>
            <div>
              <TextField
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="bio"
                label="Bio"
                name="bio"
                onChange={handleChange}
                value={details.bio}
              ></TextField>
            </div>
            <div>
              <Typography sx={{ display: "inline" }}>Add a Photo:</Typography>
              <IconButton
                aria-label="upload picture"
                component="label"
                color="primary"
              >
                <input
                  hidden
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                ></input>
                <PhotoCamera />
              </IconButton>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3 }}
            >
              Add To Database
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
