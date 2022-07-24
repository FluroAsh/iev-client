import { React, useReducer } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./styles/main.scss";
import { Navbar } from "./layouts/Navbar.js";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";

import { reducer } from "./utils/reducer";
import { StateContext } from "./context/stateContext";
import { NotFound } from "./pages/NotFound";
import { Container } from "@mui/material";
import { ChargerForm } from "./components/ChargerForm";
import { ViewCharger } from "./pages/ViewCharger";
import { ViewChargers } from "./pages/ViewChargers";

function App() {
  const initialState = {
    chargerList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);

  const { loggedInUser } = store;

  console.log("THIS IS STORE ", store);

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container sx={{ pt: 2 }}>
            <Routes>
              <Route path="/" element={<h1>Root Path!</h1>} />
              <Route path="/search" element={<h1>Listing a charger...</h1>} />
              {/* 
                TODO: Change these to /auth/session later, will need to have everything
                in one form and conditionally render the correct form based on state.
              */}
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/auth/signin" element={<SigninForm />} />

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
