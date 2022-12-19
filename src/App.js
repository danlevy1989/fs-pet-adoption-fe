import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import ModalContextProvider from "./components/context/ModalContext";
import GeneralContextProvider from "./components/context/GeneralContext";
import { Routes, Route } from "react-router-dom";
import SearchPetForm from "./components/forms/SearchPetForm";
import AddPet from "./components/adminpages/AddPet";
import LoginModal from "./components/modals/LoginModal";
import { useEffect } from "react";
import { useAuthContext } from "./components/context/AuthContext";
import PetPage from "./components/PetPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Profile from "./components/pages/Profile";
import DashBoard from "./components/adminpages/DashBoard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import EditPetForm from "./components/adminpages/EditPetForm";
import MyPets from "./components/pages/MyPets";

const theme = createTheme({
  typography: {
    fontFamily: ["DynaPuff", "cursive"].join(","),
  },
});

function App() {
  const { setToken, setCurrentUser } = useAuthContext();

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromStorage = JSON.parse(localStorage.getItem("token"));

    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }

    if (userFromStorage) {
      setCurrentUser(userFromStorage);
    }
  }, []);

  return (
    <div className="App">
      <GeneralContextProvider>
        <ModalContextProvider>
          <Navbar />
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPetForm />} />
              <Route path="/login" element={<LoginModal />} />
              <Route exact path="/petPage/:petId" element={<PetPage />} />
              {/* Admin  */}
              <Route element={<AdminRoute />}>
                <Route path="/addpet" element={<AddPet />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route exact path="/editPet/:petId" element={<EditPetForm />} />
              </Route>
              {/* Logged in Users  */}
              <Route element={<PrivateRoute />}>
                <Route path="/myPets" element={<MyPets />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ModalContextProvider>
      </GeneralContextProvider>
    </div>
  );
}

export default App;
