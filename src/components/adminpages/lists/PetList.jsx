import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PetRow from "./petRow";
import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";

export default function PetList() {
  const { getAllPets } = useGeneralContext();
  const [allPets, setAllPets] = useState(null);
  const { token } = useAuthContext();

  const showAllPets = async () => {
    const res = await getAllPets(token);
    if (res) {
      setAllPets(res.pet);
    }
  };

  useEffect(() => {
    showAllPets();
  }, []);

  return (
    <Table sx={{ mt: 4, mb: 6 }} size="medium">
      <TableHead>
        <TableRow>
          <TableCell>Pet Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Breed</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Height</TableCell>
          <TableCell>Weight</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allPets && allPets.map((pet) => <PetRow key={pet._id} pet={pet} />)}
      </TableBody>
    </Table>
  );
}
