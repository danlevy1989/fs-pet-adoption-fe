import React, { useState } from "react";
import PetList from "./lists/PetList";
import UserList from "./lists/UserList";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function DashBoard() {
  const [toggleLists, setToggleLists] = useState(false);
  const [alignment, setAlignment] = useState("users");

  const handleChange = (event,newAlignment) => {
    setAlignment(newAlignment);
    setToggleLists(!toggleLists);
  };


  return (
    <div className="dashBoardContainer">
      <Typography
        sx={{ mt: 10, mb: 5 }}
        display="inline"
        component="h1"
        variant="h5"
        fontWeight={600}
        color="rgb(4, 3, 47)"
      >
        Admin Dashboard
      </Typography>

      <ToggleButtonGroup
        sx={{ display: "flex", justifyContent: "center" }}
        size="large"
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton disabled={!toggleLists}  value="users">Users</ToggleButton>
        <ToggleButton disabled={toggleLists} value="pets">Pets</ToggleButton>
      </ToggleButtonGroup>

      {toggleLists ? <PetList /> : <UserList />}
    </div>
  );
}
