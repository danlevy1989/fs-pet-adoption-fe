import React from "react";
import PetCard from "./PetCard";
import Grid from "@mui/material/Grid";


export default function PetList({ searchResults }) {
  return (
    <Grid sx={{mb: 5}} justifyContent="center" width="110vh" container spacing={5}>
      {searchResults.length > 0 &&
        searchResults.map((petCard) => (
          <PetCard key={petCard._id} petCard={petCard} />
        ))}
    </Grid>
  );
}
