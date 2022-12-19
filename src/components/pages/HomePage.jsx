import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpModal from "../modals/SignUpModal";
import { useModalContext } from "../context/ModalContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
 
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { handleOpenSignUp } = useModalContext();
  return (
    <div className="container">
      <Box
        sx={{
          mt: 6,
          bgcolor: "none",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="m">
          <Typography
            display="inline"
            component="h1"
            variant="h3"
            fontWeight={750}
            align="center"
            color="orange"
            gutterBottom
            mr={3}
          >
            {currentUser ? "Wellcome Back," : "Adopt"}
          </Typography>
          <Typography
            display="inline"
            component="h1"
            variant="h3"
            fontWeight={600}
            align="center"
            color="rgb(4, 3, 47)"
            gutterBottom
          >
            {currentUser ? `${currentUser.firstName}!` : " Any Pet You Like!"}
          </Typography>
        </Container>

        <Container maxWidth="sm">
          <Typography
            sx={{ mt: 2 }}
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            We Have so many loving adoptable pets and they are waiting for a
            family to call their own.
          </Typography>
          <Typography
            sx={{ fontWeight: 700, mt: 1 }}
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Cats, Dogs and even Racoons! Find your new best friend today!
          </Typography>
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {currentUser ? (
              <Button
                onClick={() => navigate("/search")}
                sx={{
                  bottom: 10,
                  backgroundColor: "rgb(4, 3, 47)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                variant="contained"
              >
                Explore our pets!
              </Button>
            ) : (
              <Button
                onClick={() => handleOpenSignUp()}
                sx={{
                  bottom: 10,
                  backgroundColor: "rgb(4, 3, 47)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                variant="contained"
              >
                Let's get started!
              </Button>
            )}

            <SignUpModal />
          </Stack>
        </Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            width: "70vh",
          }}
        >
          <Card
            sx={{
              mr: 4,
              left: "10vh",
              mt: 3,
              width: "18vh",
              height: "18vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography
                fontWeight={700}
                gutterBottom
                variant="h5"
                component="h2"
              >
                +3500
              </Typography>
              <Typography fontSize={15}>
                We care for more than 3,500 animals through our adoptions
                program.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              mr: 4,
              left: "10vh",
              mt: 3,
              width: "18vh",
              height: "18vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography
                fontWeight={700}
                gutterBottom
                variant="h5"
                component="h2"
              >
                97.9%
              </Typography>
              <Typography fontSize={15}>
                We have a 97.9% live-save rate.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              left: "10vh",
              mt: 3,
              width: "18vh",
              height: "18vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography
                fontWeight={700}
                gutterBottom
                variant="h5"
                component="h2"
              >
                +10
              </Typography>
              <Typography fontSize={15}>
                Years of experiance of giving love.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
