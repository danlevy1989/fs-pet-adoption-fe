import React, { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";
import { SearchPetTypes, AdopStatus } from "../models/Pet";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import PetList from "../PetList";
import { useAuthContext } from "../context/AuthContext";
import { useGeneralContext } from "../context/GeneralContext";

export default function SearchPetForm() {
  const { getPetsBySearch, getUserById } = useGeneralContext();
  const [toggleAdvancedSearch, setToggleAdvancedSearch] = useState(false);
  const { currentUser, setCurrentUser } = useAuthContext();
  const [searchResults, setSearchResults] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState("");
  const [details, setDetails] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
  });

  const getSavedPets = async () => {
    const res = await getUserById(currentUser._id);
    const savedPets = res.petsSaved;
    setCurrentUser({ ...currentUser, petsSaved: savedPets });
  };

  useEffect(() => {
    if (currentUser) {
      getSavedPets();
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnSearch(true);
    const searchQuery = details;
    const res = await getPetsBySearch(searchQuery);
    if (res) {
      setSearchResults(res.pet);
      setNumberOfResults(res.results);
    }
  };

  return (
    <div className="searchPetContainer">
      <Typography
        sx={{
          mb: 4,
        }}
        display="inline"
        component="h1"
        variant="h3"
        fontWeight={600}
        align="center"
        color="rgb(4, 3, 47)"
        gutterBottom
      >
        Let's find your new friend!
      </Typography>
      {!toggleAdvancedSearch ? (
        <Box
          component="form"
          sx={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            width: "28ch",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
          
            <TextField
              sx={{
                mb: 2,
                width: "26ch",
              }}
              id="standard-select-pet"
              select
              name="type"
              label="Which pet do you want?"
              value={details.type}
              onChange={handleChange}
            >
              {SearchPetTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3 }}
            onClick={handleSubmit}
          >
            Search
          </Button>
    
          <Button
            onClick={() => {
              setToggleAdvancedSearch(true);
            }}
            size="small"
            sx={{ fontWeight: 600 }}
          >
            Advanced Search
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            mb: 4,
            width: "28ch",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              sx={{
                mb: 2,
                width: "26ch",
              }}
              id="select-pet"
              value={details.type}
              onChange={handleChange}
              select
              label="Whice pet do you want?"
              name="type"
            >
              {SearchPetTypes.map((option) => (
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
                width: "12.5ch",
              }}
              id="standard-select-adoption-status"
              label="Status"
              select
              name="adoptionStatus"
              value={details.adoptionStatus}
              onChange={handleChange}
            >
              {AdopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{
                mb: 2,
                width: "12.5ch",
              }}
              id="pet-name"
              label="Name"
              name="name"
              onChange={handleChange}
              value={details.name}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{
                mb: 2,
                width: "13ch",
              }}
              id="standard-basic"
              name="minHeight"
              label="Min height in CM"
              variant="standard"
              onChange={handleChange}
              value={details.minHeight}
            />
            <TextField
              sx={{
                mb: 2,
                width: "13ch",
              }}
              id="standard-basic"
              label="Max height in CM"
              name="maxHeight"
              variant="standard"
              onChange={handleChange}
              value={details.maxHeight}
            />
          </div>
          <div>
            <TextField
              sx={{
                mb: 2,
                width: "13ch",
              }}
              id="standard-basic"
              name="minWeight"
              label="Min weight in CM"
              variant="standard"
              onChange={handleChange}
              value={details.minWeight}
            />
            <TextField
              sx={{
                mb: 2,
                width: "13ch",
              }}
              id="standard-basic"
              name="maxWeight"
              label="Max weight in CM"
              variant="standard"
              onChange={handleChange}
              value={details.maxWeight}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3 }}
            onClick={handleSubmit}
          >
            Search
          </Button>

          <Button
            onClick={() => {
              setToggleAdvancedSearch(!toggleAdvancedSearch);
            }}
            size="small"
            sx={{ fontWeight: 600 }}
          >
            Back to Basic Search
          </Button>
        </Box>
      )}
      {onSearch &&
        (searchResults.length > 0 ? (
          <Typography sx={{ mb: 3 }}>
            Showing 1 of {numberOfResults} results.
          </Typography>
        ) : (
          <Typography>No results matching your search ceriteria.</Typography>
        ))}

      <PetList searchResults={searchResults} />
    </div>
  );
}
