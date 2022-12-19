import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function UserRow({ user }) {
  const { _id, phoneNumber, firstName, lastName, email, petsOwned } = user;
  const [openUser, setOpenUser] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{_id}</TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell>{lastName}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phoneNumber}</TableCell>
        <TableCell>
          {petsOwned.length > 0 ? (
            <IconButton onClick={() => setOpenUser(!openUser)}>
              <VisibilityOutlinedIcon />
            </IconButton>
          ) : "No Pets to show"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          {openUser && (
            <Grid width="110vh" container spacing={4}>
              {petsOwned.map((pet) => (
                <Grid
                  key={pet._id}
                  sx={{ maxWidth: "24vh", minWidth: "24vh" }}
                  item
                  xs={2}
                  sm={2}
                  md={2}
                >
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
                      {pet.name}
                    </Typography>

                    <CardMedia
                      sx={{ maxHeight: "19vh", minHeight: "19vh" }}
                      component="img"
                      image={pet.imageUrl}
                      alt="NO IMAGE"
                    />

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 13,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      gutterBottom
                      variant="h6"
                      component="h2"
                    >
                      Id : {pet._id}
                    </Typography>

                    <CardActions sx={{ justifyContent: "space-Between" }}>
                      <Button
                        sx={{
                          backgroundColor: "blue",
                          cursor: "default",
                          "&:hover": {
                            backgroundColor: "blue",
                          },
                        }}
                        variant="contained"
                        size="small"
                      >
                        {pet.adoptionStatus}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
