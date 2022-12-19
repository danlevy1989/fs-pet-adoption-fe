import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UserRow from "./UserRow";
import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";

export default function UserList() {
  const { getAllUsers } = useGeneralContext();
  const { token } = useAuthContext();
  const [allUsers, setAllUsers] = useState(null);



  const showAllUsers = async () => {
    const res = await getAllUsers(token);
    if (res) {
      setAllUsers(res);
    }
  };

  useEffect(() => {
    showAllUsers();
  }, []);



  return (
    <Table sx={{ mt: 4 }} size="medium">
      <TableHead>
        <TableRow>
          <TableCell>User Id</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers &&
          allUsers.map((user) => <UserRow key={user._id} user={user} />)}
      </TableBody>
    </Table>
  );
}
