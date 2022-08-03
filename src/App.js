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
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import { ChargerForm } from "./components/ChargerForm";
import { NotFound } from "./pages/NotFound";
import { ViewCharger } from "./pages/ViewCharger";
import { ViewChargers } from "./pages/ViewChargers";
import { EditCharger } from "./pages/EditCharger";
import { SearchLocation } from "./pages/SearchLocation";
import { Dashboard } from "./pages/Dashboard";

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
    errorMessage: "",
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  return (
    <div className="app">
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Navbar />
          <Container className="inner-container" disableGutters>
            <Routes>
              <Route path="/" element={<Navigate to="chargers" replace />} />
              <Route path="/success" element={<Navigate to="chargers" replace />} />
              <Route path="/canceled" element={<Navigate to="/bookings/:username" replace />} />

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
                {/* <Route path="user/:username" element={<Chargers />} /> */}
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



// import React, { useState, useEffect } from "react";
// import "./App.css";

// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay />
//   );
// }