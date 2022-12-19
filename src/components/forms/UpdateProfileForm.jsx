import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { updateUserSchema } from "../schemas/basicSchema";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";
import { useGeneralContext } from "../context/GeneralContext";

export default function UpdateProfileForm() {
  const { toastSuccses, getFullUserById, updateUserById } =
    useGeneralContext();
  const [image, setImage] = useState("");
  const { currentUser, token,  setCurrentUser } = useAuthContext();
  const [userFullDetails, setUserFullDetails] = useState("");
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0]);
  };

  const getFullUserDetails = async () => {
    const res = await getFullUserById(currentUser._id, token);
    if (res) {
      setUserFullDetails(res);
    }
  };

  useEffect(() => {
    getFullUserDetails();
  }, []);

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: userFullDetails.firstName || "",
      lastName: userFullDetails.lastName || "",
      email: userFullDetails.email || "",
      phoneNumber: userFullDetails.phoneNumber || "",
      password: "",
      rePassword: "",
      bio: userFullDetails.bio || "",
    },
    enableReinitialize: true,
    validationSchema: updateUserSchema,
    onSubmit: async (values) => {
      setError(null);
      const userData = new FormData();
      for (let key in values) {
        userData.append(key, values[key]);






      }

      if (image) {
        userData.append("profileImage", image);
      }
      setImage("");

      const res = await updateUserById(currentUser._id, userData, token);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.updatedUser));
        toastSuccses(res.message);
        setCurrentUser(res.updatedUser);
      }
    },
  });

  return (
    <div className="updateUserContainer">
      <Typography
        sx={{ mb: 3 }}
        component="h1"
        variant="h4"
        fontWeight={600}
        align="center"
        color="rgb(4, 3, 47)"
        gutterBottom
      >
        Hey {currentUser.firstName}!
      </Typography>
      <Typography
        sx={{ mb: 3 }}
        component="h1"
        variant="h4"
        fontWeight={600}
        align="center"
        color="rgb(4, 3, 47)"
        gutterBottom
      >
        You can update your profile here:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 4, width: "50ch" }}>
          <div className="updateForm">
            <Typography sx={{ alignSelf: "center" }}>First Name:</Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              id="firstName"
              name="firstName"
              error={
                (errors.firstName && touched.firstName) || error ? true : false
              }
              helperText={
                errors.firstName && touched.firstName
                  ? "Enter a valid First Name!"
                  : ""
              }
              value={values.firstName}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>
              Last Name:
            </Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              id="lastName"
              name="lastName"
              value={values.lastName}
              error={
                (errors.lastName && touched.lastName) || error ? true : false
              }
              helperText={
                errors.lastName && touched.lastName
                  ? "Enter a valid Last Name!"
                  : ""
              }
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>Email:</Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              error={(errors.email && touched.email) || error ? true : false}
              helperText={
                errors.email && touched.email ? "Enter a valid email!" : ""
              }
            ></TextField>
          </div>

          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>
              Password:
            </Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password
                  ? "Passwords must contain aleast 6 characters!"
                  : ""
              }
            ></TextField>
          </div>

          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>
              Re Passowrd:
            </Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              name="rePassword"
              type="password"
              value={values.rePassword}
              onChange={handleChange}
              error={errors.rePassword && touched.rePassword ? true : false}
              helperText={
                errors.rePassword && touched.rePassword
                  ? "Passwords don't match!"
                  : ""
              }
            ></TextField>
          </div>

          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>
              Phone Number:
            </Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                width: "30ch",
              }}
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              error={
                (errors.phoneNumber && touched.phoneNumber) || error
                  ? true
                  : false
              }
              helperText={
                errors.phoneNumber && touched.phoneNumber
                  ? "Enter a valid Phone Number!"
                  : ""
              }
              value={values.phoneNumber}
            ></TextField>
          </div>
          <div className="updateForm">
            <Typography sx={{ alignSelf: "center", mt: 3 }}>Bio:</Typography>
            <TextField
              sx={{
                input: { color: "rgb(4, 3, 47)" },
                ml: 2,
                mb: 3,
                width: "30ch",
              }}
              id="bio"
              name="bio"
              onChange={handleChange}
              value={values.bio}
            ></TextField>
          </div>

          <div>
            <Typography sx={{ display: "inline" }}>Add a Photo:</Typography>
            <IconButton
              aria-label="upload picture"
              component="label"
              color="primary"
            >
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
              <PhotoCamera />
            </IconButton>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
}
