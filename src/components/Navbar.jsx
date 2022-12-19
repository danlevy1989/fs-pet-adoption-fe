import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PetsIcon from "@mui/icons-material/Pets";
import LoginModal from "./modals/LoginModal";
import { useModalContext } from "./context/ModalContext";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SignUpModal from "./modals/SignUpModal";
import { useAuthContext } from "./context/AuthContext";

export default function Navbar() {
  const { token, setToken, currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { handleOpenLogin } = useModalContext();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = currentUser.isAdmin
    ? [
        { name: "Logout", id: 1, path: "" },
        { name: "Profile", id: 2, path: "profile" },
        { name: "My Pets", id: 3, path: "mypets" },
        { name: "Add a Pet", id: 4, path: "addpet" },
        { name: "Dashboard", id: 5, path: "dashboard" },
      ]
    : [
        { name: "Logout", id: 1, path: "" },
        { name: "Profile", id: 3, path: "profile" },
        { name: "My Pets", id: 4, path: "mypets" },
      ];

  const pages = [
    { name: "Home", id: 1, path: "" },
    { name: "Search", id: 2, path: "search" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    navigate(`/${path}`);
  };

  const handleLogin = () => {
    setAnchorElUser(null);
    handleOpenLogin();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateUserMenu = (name, path) => {
    setAnchorElUser(null);
    navigate(`/${path}`);

    if (name === "Logout") {
      setToken(null);
      localStorage.clear();
      window.location.reload();
      navigate(`/`);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar
        sx={{ minWidth: "100%", backgroundColor: "rgb(4, 3, 47)" }}
        position="fixed"
      >
        <Toolbar sx={{ backgroundColor: "rgb(4, 3, 47)" }} disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 3,
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            getPet
          </Typography>
          <PetsIcon sx={{ mr: 4, display: { xs: "none", md: "flex" } }} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              texttransform="none"
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            getPet
            <PetsIcon sx={{ ml: 1, display: { xs: "flex", md: "none" } }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, mr: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <LoginModal />
          <SignUpModal />
          <Typography sx={{ mr: 4, fontSize: "18px" }}>
            Hello, {token ? currentUser.firstName : "Guest"}
          </Typography>
          <Box sx={{ mr: 6, flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="No Image"
                  src={
                    currentUser.imageUrl
                      ? currentUser.imageUrl
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token ? (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={() =>
                      handleNavigateUserMenu(setting.name, setting.path)
                    }
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem key="login" onClick={() => handleLogin()}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
