import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useModalContext } from "../context/ModalContext";
import SignUpModal from "../modals/SignUpModal";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../context/GeneralContext";

export default function LoginForm() {
  const { toastSuccses } = useGeneralContext();
  const navigate = useNavigate();
  const { setToken, setCurrentUser } = useAuthContext();
  const [error, setError] = useState(null);
  const { handleOpenSignUp, handleCloseLogin } = useModalContext();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleMoveToSignUp = () => {
    handleCloseLogin();
    handleOpenSignUp();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const userAuth = details;
    try {
      const res = await axios.post("http://localhost:8080/login", userAuth);
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data);
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setToken(res.data.token);
        handleCloseLogin();
        toastSuccses("Login Succsesfull");
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <CssBaseline />
      <form>
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login:
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              error={error && true}
              id="email"
              label="Email "
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              error={error && true}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "rgb(4, 3, 47)", mt: 3, mb: 2 }}
            >
              Sign-In
            </Button>
            {error && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: 14,
                }}
              >
                {error}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              All fields are mandatory!
            </Typography>

            <Button
              onClick={handleMoveToSignUp}
              fullWidth
              sx={{ right: 24, textTransform: "none" }}
            >
              Don't Have An Account? Sign-Up For Free!
            </Button>
            <SignUpModal />
          </Box>
        </Box>
      </form>
    </>
  );
}
