import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PetRow({ pet }) {
  const { _id, adoptionStatus, name, height, weight, breed, type } = pet;
  let navigate = useNavigate();
  const handleShowPet = () => {
    navigate(`/editPet/${_id}`);
  };
  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{breed}</TableCell>
      <TableCell>{adoptionStatus}</TableCell>
      <TableCell>{height}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>
        <IconButton onClick={handleShowPet}>
          <ModeEditOutlineTwoToneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
