import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import MenuItem from "@mui/material/MenuItem";
import { Hypoallergenic, PetTypes, AdopStatus } from "../models/Pet";
import { useGeneralContext } from "../context/GeneralContext";

export default function EditPetForm() {
  const { currentUser, token } = useAuthContext();
  const { toastSuccses, getPetById, updatePetById } = useGeneralContext();
  const [petDetails, setPetDetails] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    hypoallergenic: false,
    breed: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    dietary: "",
    _id: "",
  });

  const getPetDetails = async () => {
    const petId = window.location.href.split("/").pop();
    const res = await getPetById(petId, token);
    if (res) {
      setPetDetails({
        type: res.type || "",
        name: res.name || "",
        adoptionStatus: res.adoptionStatus || "",
        hypoallergenic: res.hypoallergenic || false,
        breed: res.breed || "",
        height: res.height || "",
        weight: res.weight || "",
        color: res.color || "",
        bio: res.bio || "",
        dietary: res.dietary || "",
        _id: res._id || "",
      });
    }
  };

  useEffect(() => {
    getPetDetails();
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPetDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updatePetById(petDetails._id, petDetails, token);
    if (res) {
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
          Hey {currentUser.firstName}, Edit pet here:
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 4, width: "40ch" }}>
            <div>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{ mb: 2, width: "40ch" }}
                id="select-pet"
                select
                required
                label="Pet type"
                name="type"
                onChange={handleChange}
                value={petDetails.type}
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
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{ mb: 2, mr: 2, width: "19ch" }}
                id="pet-name"
                label="Name"
                name="name"
                required
                onChange={handleChange}
                value={petDetails.name}
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{ mb: 2, width: "19ch" }}
                id="color"
                label="Color"
                name="color"
                onChange={handleChange}
                value={petDetails.color}
              ></TextField>
            </div>
            <div>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="select-breed"
                label="Breed"
                name="breed"
                onChange={handleChange}
                value={petDetails.breed}
              ></TextField>
            </div>

            <div>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{ mb: 2, mr: 2, width: "19ch" }}
                id="select-adoption-status"
                label="Status"
                select
                required
                name="adoptionStatus"
                onChange={handleChange}
                value={petDetails.adoptionStatus}
              >
                {AdopStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{ mb: 2, width: "19ch" }}
                id="hypoallergenic "
                select
                label="Hypoallergenic"
                name="hypoallergenic"
                onChange={handleChange}
                value={petDetails.hypoallergenic}
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
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
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
                value={petDetails.height}
              />
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{
                  mb: 2,
                  width: "19ch",
                }}
                id="standard-basic"
                label="Weight in KG"
                name="weight"
                onChange={handleChange}
                value={petDetails.weight}
              />
            </div>

            <div>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="dietary-restrictions"
                label="Dietary Restrictions"
                name="dietary"
                onChange={handleChange}
                value={petDetails.dietary}
              ></TextField>
            </div>
            <div>
              <TextField
                InputLabelProps={{
                  style: { color: "rgba(152, 152, 154, 0.843)" },
                }}
                sx={{
                  mb: 2,
                  width: "40ch",
                }}
                id="bio"
                label="Bio"
                name="bio"
                onChange={handleChange}
                value={petDetails.bio}
              ></TextField>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3 }}
            >
              Update
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
