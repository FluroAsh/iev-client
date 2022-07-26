import { React, useReducer } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "@mui/material";
import { reducer } from "./utils/reducer";
import { StateContext } from "./context/stateContext";
import "./styles/main.scss";

import { Navbar } from "./layouts/Navbar.js";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import { ChargerForm } from "./components/ChargerForm";
import { NotFound } from "./pages/NotFound";
import { ViewCharger } from "./pages/ViewCharger";
import { ViewChargers } from "./pages/ViewChargers";
import { SearchLocation } from "./pages/SearchLocation";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const initialState = {
    chargerList: [],
    bookingDates: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
    location: {},
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container disableGutters>
            <Routes>
              <Route path="/" element={<Navigate to="chargers" replace />} />
              <Route path="/search" element={<SearchLocation />} />
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
                <Route path="mychargers" element={<ViewChargers />} />
                {/* <Route path="user/:username" element={<Chargers />} /> */}
              </Route>
              <Route path="charger">
                <Route path=":chargerId" element={<ViewCharger />} />
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
