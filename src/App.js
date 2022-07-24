import { React, useReducer, useEffect, useInsertionEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  // useParams,
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
import { ChargerDetail } from "./components/ChargerDetail";
import { Chargers } from "./components/Chargers";
import { getMyChargers, getChargers } from "./services/chargerServices";

import { displayChargers } from "./layouts/Navbar";

function App() {
  const initialState = {
    chargerList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  // let { id } = useParams();

  const [store, dispatch] = useReducer(reducer, initialState);

  const { loggedInUser } = store;

  // const location = useLocation();

  // useEffect(displayChargers({hash: "", key: "qz8l546r", pathname: "/chargers", search: "", state: null}, dispatch), []);
  // useEffect(displayChargers(location, dispatch), [location]);
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
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/auth/signin" element={<SigninForm />} />

              <Route path="chargers">
                <Route index element={<Chargers />} />
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
                <Route path="mychargers" element={<Chargers />} />

                {/* <Route path="user/:username" element={<Chargers />} /> */}
              </Route>
              <Route path="charger">
                <Route path=":chargerId" element={<ChargerDetail />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}
// export const displayChargers = (loggedInUser) => {
//   try {
//     let chargers = [];

//     if (loggedInUser) {
//       chargers = getMyChargers();
//     } else {
//       chargers = getChargers();
//     }
//     dispatch({
//       type: "setChargerList",
//       data: chargers,
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
export default App;
