import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { signUpSchema } from "../schemas/basicSchema";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useModalContext } from "../context/ModalContext";

export default function SignUpForm() {
  const { handleCloseSignUp, handleOpenLogin } = useModalContext();
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(null);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        rePassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: (values, actions) => {
        setError(null);

        const newUser = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          rePassword: values.rePassword,
        };

        axios
          .post("http://localhost:8080/signUp", newUser)
          .then((res) => {
            setRegistered(res.data);
            actions.resetForm();
          })
          .catch((err) => setError(err.response.data));
      },
    });

  const handleMoveToLogin = () => {
    handleCloseSignUp();
    handleOpenLogin();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Let's Create A User!
        </Typography>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { width: "18ch" },
              }}
            >
              <TextField
                sx={{
                  mr: 1,
                }}
                margin="normal"
                name="firstName"
                label="First Name"
                type="name"
                error={errors.firstName && touched.firstName ? true : false}
                onChange={handleChange}
                value={values.firstName}
                onBlur={handleBlur}
                helperText={
                  errors.firstName && touched.firstName
                    ? "Name is not valid!"
                    : ""
                }
              />

              <TextField
                margin="normal"
                name="lastName"
                label="Last Name"
                type="name"
                onChange={handleChange}
                value={values.lastName}
                onBlur={handleBlur}
                error={errors.lastName && touched.lastName ? true : false}
                helperText={
                  errors.lastName && touched.lastName
                    ? "Last Name is not valid!"
                    : ""
                }
              />
            </Box>

            <TextField
              margin="normal"
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              placeholder="e.g 0501234567 "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              error={errors.phoneNumber && touched.phoneNumber ? true : false}
              helperText={
                errors.phoneNumber && touched.phoneNumber
                  ? "Enter a valid phone number!"
                  : ""
              }
            />

            <TextField
              margin="normal"
              fullWidth
              placeholder="e.g mymail@gmail.com "
              label="Email "
              name="email"
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={(errors.email && touched.email) || error ? true : false}
              helperText={
                errors.email && touched.email ? "Enter a valid email!" : ""
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              placeholder="minimum of 6 characters "
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password
                  ? "Passwords must contain aleast 6 characters!"
                  : ""
              }
            />
            <TextField
              margin="normal"
              fullWidth
              label="Re enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="rePassword"
              type="password"
              value={values.rePassword}
              error={errors.rePassword && touched.rePassword ? true : false}
              helperText={
                errors.rePassword && touched.rePassword
                  ? "Passwords don't match!"
                  : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </form>
          {error && (
            <Typography
              sx={{
                color: "red",
                fontSize: 16,
              }}
            >
              {error}
            </Typography>
          )}

          {registered && (
            <Typography
              sx={{
                color: "green",
                fontSize: 16,
              }}
            >
              Succsesfully Registered!
              <Button
                onClick={handleMoveToLogin}
                sx={{ ml: 1, mb: 0.3, fontSize: 16, textTransform: "none" }}
              >
                Login Here
              </Button>
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            All fields are mandatory!
          </Typography>
        </Box>
      </Box>
    </>
  );
}
