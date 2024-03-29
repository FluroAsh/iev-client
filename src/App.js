import { React, useReducer } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "@mui/material";

import "./styles/main.scss";
import { reducer } from "./utils/reducer";
import { StateContext } from "./context/stateContext";
import { Navbar } from "./layouts/Navbar.js";
import { SignupForm } from "./pages/SignupForm";
import { SigninForm } from "./pages/SigninForm";
import { ChargerForm } from "./components/ChargerForm";
import { AddVehicle } from "./pages/AddVehicle";
import { NotFound } from "./pages/NotFound";
import { ViewCharger } from "./pages/ViewCharger";
import { ViewChargers } from "./pages/ViewChargers";
import { EditCharger } from "./pages/EditCharger";
import { SearchLocation } from "./pages/SearchLocation";
import { Dashboard } from "./pages/Dashboard";
import { Alert } from "./components/Alert";

function App() {
  const initialState = {
    chargerList: [],
    bookingDates: [],
    bookings: [],
    bookingRequests: [],
    hostStatus: false,
    chargerStatus: "",
    editFormData: {},
    loggedInUser: sessionStorage.getItem("username") || "",
    currentUser: {
      firstName: sessionStorage.getItem("firstName") || "",
      lastName: sessionStorage.getItem("lastName") || "",
    },
    token: sessionStorage.getItem("token") || null,
    location: {},
    successMessage: "",
    errorMessage: "",
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser, errorMessage, successMessage } = store;

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container
            className="inner-container"
            disableGutters
            sx={{ position: "relative" }}
          >
            {/* errorMessage is cleared on component render */}
            {(errorMessage || successMessage) && (
              <Alert
                message={errorMessage || successMessage}
                variant={errorMessage ? "error" : "success"}
              />
            )}

            <Routes>
              <Route path="/" element={<Navigate to="chargers" replace />} />
              <Route
                path="/success"
                element={<Navigate to="chargers" replace />}
              />
              {/* typo */}
              <Route
                path="/canceled"
                element={<Navigate to="/bookings/:username" replace />}
              />

              <Route path="/search" element={<SearchLocation />} />
              <Route path="/vehicle/new" element={<AddVehicle />} />

              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/auth/signin" element={<SigninForm />} />
              <Route
                path="/bookings/:username"
                element={
                  loggedInUser ? <Dashboard /> : <Navigate to="/auth/signin" />
                }
              />
              <Route path="chargers">
                <Route index element={<ViewChargers />} />
                <Route
                  path="new"
                  element={
                    loggedInUser ? (
                      <ChargerForm />
                    ) : (
                      <Navigate to="/auth/signin" />
                    )
                  }
                />
                <Route
                  path="mychargers"
                  element={
                    loggedInUser ? (
                      <ViewChargers />
                    ) : (
                      <Navigate to="/auth/signin" />
                    )
                  }
                />
              </Route>
              <Route path="charger">
                <Route path=":chargerId" element={<ViewCharger />} />
                <Route path=":chargerId/edit" element={<EditCharger />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
