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

export async function populateRequests(
  username,
  dispatch,
  setError,
  setLoading
) {
  try {
    setLoading(true);
    const requests = await getUserBookingRequests(username);
    // Backend checks if user has any current chargers (is a host)
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

export async function populateBookings(
  username,
  dispatch,
  setError,
  setLoading
) {
  try {
    setLoading(true);
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
    populateBookings(loggedInUser, dispatch, setError, setLoading);
    populateRequests(loggedInUser, dispatch, setError, setLoading);
  }, [loggedInUser]);

  // TODO: Pass styles as prop based on if user is a prop or not
  // this is to resize the tables to the correct height & ??? etc.
  const styles = {
    // user.host && styles.host.tableheight ()
    host: {
      tableMinHeight: "40vw",
    },
  };

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {error && <AlertError message={error.message} setError={setError} />}
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
                requests={bookingRequests}
                styles={styles}
                hostStatus={hostStatus}
              />
            ) : (
              <NoResults message={"No requests... Yet! 🔌"} />
            ))}

          {/* NOTE: Not every host will have bookings */}
          {bookings.length > 0 ? (
            <UserBookings
              bookings={bookings}
              styles={styles}
              hostStatus={hostStatus}
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
