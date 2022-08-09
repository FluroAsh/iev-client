import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserRequests";
import { CssLoader } from "../components/CssLoader";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { useGlobalState } from "../context/stateContext";
import { checkHost } from "../services/authServices";

// Handle fetching Hosts' requests
export async function fetchRequests(username, dispatch, setLoading) {
  try {
    setLoading(true);
    const requests = await getUserBookingRequests(username);
    const response = await checkHost();
    console.log({ requests, response });

    // Check backend response for valid message
    if (response.message === "User is a host") {
      dispatch({
        type: "setHostStatus",
        data: true,
      });
    }
    dispatch({
      type: "setUserRequests",
      data: requests,
    });
  } catch (err) {
    // Only throw an error if unhandled exception
    if (err.message === "User is not a host") return;
    dispatch({
      type: "setErrorMessage",
      data: err,
    });
  } finally {
    setLoading(false);
  }
}

// Handle fetching User/Hosts' bookings
export async function fetchBookings(username, dispatch, setLoading) {
  try {
    setLoading(true);
    const bookings = await getUserBookings(username);
    dispatch({
      type: "setUserBookings",
      data: bookings,
    });
  } catch (err) {
    dispatch({
      type: "setErrorMessage",
      data: err,
    });
  } finally {
    setLoading(false);
  }
}

// Only rendered in the dashboard given a User/Host has no Bookings/Requests
const NoResults = ({ message }) => {
  return (
    <div className="no-results">
      <p>{message}</p>
    </div>
  );
};

// Become a host component (rendered if user has no chargers)
const BecomeHost = () => {
  return (
    <div className="host-container">
      <div className="host">
        <Typography variant="p" sx={{ padding: "0 10px 10px" }}>
          Looking to become a host? Click below to create your first charging
          station!
        </Typography>
        <Link to={"/chargers/new"}>
          <Button variant="contained">Become a Host</Button>
        </Link>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { store, dispatch } = useGlobalState();
  const { currentUser, loggedInUser, bookings, bookingRequests, hostStatus } =
    store;

  useEffect(() => {
    fetchBookings(loggedInUser, dispatch, dispatch, setLoading);
    fetchRequests(loggedInUser, dispatch, dispatch, setLoading);
  }, [loggedInUser, dispatch]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {!loading && (
        <AnimatePresence>
          <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: "relative" }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
              Welcome Back {currentUser.firstName}! 👋
            </Typography>

            {/* User must be a Host & have > 0 booking requests */}
            {hostStatus &&
              (bookingRequests.length > 0 ? (
                <UserRequests />
              ) : (
                <NoResults message={"No requests... Yet! 🔌"} />
              ))}

            {/* NOTE: Not every host will have bookings */}
            {bookings.length > 0 ? (
              <UserBookings />
            ) : (
              <NoResults message={"You haven't made any bookings... Yet 😉"} />
            )}

            {!hostStatus && <BecomeHost />}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
