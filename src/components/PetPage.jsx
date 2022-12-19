import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Container, Typography } from "@mui/material";
import { useAuthContext } from "../components/context/AuthContext";
import { useGeneralContext } from "./context/GeneralContext";

export default function PetPage() {
  const { toastSuccses, getPetById, adoptOrFosterPet, returnPet } =
    useGeneralContext();
  const [currentPet, setCurrentPet] = useState("");
  const { currentUser, token } = useAuthContext();

  const showCurrentPet = async () => {
    const petId = window.location.href.split("/").pop();
    const res = await getPetById(petId);
    if (res) {
      setCurrentPet(res);
    }
  };

  useEffect(() => {
    showCurrentPet();
  }, []);

  const handleAdoptOrFoster = async (action) => {
    const actionObj = { action: action };
    const res = await adoptOrFosterPet(currentPet._id, actionObj, token);
    if (res) {
      setCurrentPet(res.pet);
      toastSuccses(`${currentPet.name} is ${action} succsesfully!`);
    }
  };

  const handleReturnPet = async () => {
    const res = await returnPet(currentPet._id, currentUser, token);
    if (res) {
      setCurrentPet(res.pet);
      toastSuccses(`${currentPet.name} is returned succsesfully!`);
    }
  };

  return (
    <div className="petPageContainer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "110vh",
          mt: 6,
          bgcolor: "none",
          ml: 22,
          pb: 6,
        }}
      >
        <Container maxWidth="m">
          <Typography
            sx={{
              mr: 3,
              color: "rgb(4, 3, 47)",
              fontWeight: 750,
              fontSize: "80px",
            }}
          >
            Hey!
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            My Name is <span className="petCardSpan"> {currentPet.name} </span>
          </Typography>

          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            I'm A <span className="petCardSpan"> {currentPet.type} </span>
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            My Color is:{" "}
            <span className="petCardSpan">
              {" "}
              {currentPet.color ? currentPet.color : "N/A"}
            </span>
          </Typography>

          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            My Height is:{" "}
            <span className="petCardSpan">
              {" "}
              {currentPet.height ? `${currentPet.height}CM` : "N/A"}
            </span>
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            My Weight is:{" "}
            <span className="petCardSpan">
              {" "}
              {currentPet.weight ? `${currentPet.weight}KG` : "N/A"}{" "}
            </span>
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            I'm {currentPet.hypoallergenic ? "" : "Not"}{" "}
            <span className="petCardSpan"> Hypoallergenic </span>
          </Typography>

          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            My Dietary restrictions are:
            <span className="petCardSpan">
              {" "}
              {currentPet.dietary ? currentPet.dietary : "N/A"}{" "}
            </span>
          </Typography>

          <Typography
            component="h1"
            variant="h4"
            fontWeight={750}
            align="center"
            color="primary"
            gutterBottom
            mr={3}
          >
            About Me:
            <span className="petCardSpan">
              {" "}
              {currentPet.bio ? currentPet.bio : "N/A"}{" "}
            </span>
          </Typography>
          <img className="petImage" src={currentPet.imageUrl} alt="NONE" />
          {currentUser && currentPet.adoptionStatus === "Available" ? (
            <Container
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
              maxWidth="m"
            >
              <Button
                sx={{
                  mr: 4,
                  mt: 2,
                  fontSize: 18,
                  backgroundColor: "rgb(4, 3, 47)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                size="large"
                variant="contained"
                onClick={() => handleAdoptOrFoster("Adopted")}
              >
                Adopt Me!
              </Button>
              <Button
                sx={{
                  fontSize: 18,
                  mt: 2,
                  backgroundColor: "primary",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                size="large"
                variant="contained"
                onClick={() => handleAdoptOrFoster("Fostered")}
              >
                Foster Me!
              </Button>
            </Container>
          ) : (
            ""
          )}

          {currentUser &&
            currentPet.ownedBy &&
            currentPet.ownedBy === currentUser._id && (
              <Container
                sx={{ justifyContent: "center", display: "flex" }}
                maxWidth="m"
              >
                <Button
                  sx={{
                    fontSize: 18,
                    mt: 2,
                    backgroundColor: "primary",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  size="large"
                  variant="contained"
                  onClick={handleReturnPet}
                >
                  Return Pet
                </Button>
              </Container>
            )}

          {currentPet.ownedBy && currentPet.ownedBy !== currentUser._id && (
            <Container
              sx={{ justifyContent: "center", display: "flex" }}
              maxWidth="m"
            >
              <Button
                sx={{
                  mt: 2,
                  backgroundColor: "primary",
                  textTransform: "none",
                  fontWeight: 600,
                }}
                disabled={true}
                variant="contained"
              >
                This Pet is owned by someone else.
              </Button>
            </Container>
          )}
        </Container>
      </Box>
    </div>
  );
}
