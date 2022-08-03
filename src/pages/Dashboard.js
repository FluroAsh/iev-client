import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserRequests";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { AlertError } from "../components/AlertError";
import { checkHost } from "../services/authServices";
import { AlertSuccess } from "../components/AlertSuccess";

export async function fetchRequests(username, dispatch, setError, setLoading) {
  try {
    const requests = await getUserBookingRequests(username);
    const response = await checkHost();

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
    // Only throw an error if it's an unhandled exception
    if (err.message === "User is not a host") return;
    setError(err);
  } finally {
    setLoading(false);
  }
}

export async function fetchBookings(username, dispatch, setError, setLoading) {
  try {
    const bookings = await getUserBookings(username);
    dispatch({
      type: "setUserBookings",
      data: bookings,
    });
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}

const NoResults = ({ message }) => {
  return (
    <div className="no-results">
      <p>{message}</p>
    </div>
  );
};

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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { store, dispatch } = useGlobalState();
  const {
    currentUser,
    loggedInUser,
    bookings,
    bookingRequests,
    hostStatus,
  } = store;

  useEffect(() => {
    fetchBookings(loggedInUser, dispatch, setError, setLoading);
    fetchRequests(loggedInUser, dispatch, setError, setLoading);
  }, [loggedInUser]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {error && <AlertError message={error.message} setError={setError} />}
      {success && (
        <AlertSuccess message={success.message} setSuccess={setSuccess} />
      )}
      <AnimatePresence>
        <motion.div
          className="page-container"
          style={{ margin: "0 2em 2em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
            Welcome Back {currentUser.firstName}!
          </Typography>

          {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
          {hostStatus &&
            (bookingRequests.length > 0 ? (
              <UserRequests
                // styles={styles}
                // hostStatus={hostStatus}
                setError={setError}
                setSuccess={setSuccess}
              />
            ) : (
              <NoResults message={"No requests... Yet! 🔌"} />
            ))}

          {/* NOTE: Not every host will have bookings */}
          {bookings.length > 0 ? (
            <UserBookings
              setError={setError}
              setSuccess={setSuccess}
              // styles={styles}
              // hostStatus={hostStatus}
            />
          ) : (
            <NoResults message={"You haven't made any bookings... Yet 😉"} />
          )}

          {!hostStatus && <BecomeHost />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
