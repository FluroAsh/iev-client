import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserRequests";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { Button, Typography } from "@mui/material";
import { useGlobalState } from "../context/stateContext";
import { AlertError } from "../components/AlertError";
import { checkHost } from "../services/authServices";

export async function populateRequests(
  username,
  setRequests,
  setHost,
  setError,
  setLoading
) {
  try {
    setLoading(true);
    const requests = await getUserBookingRequests(username);
    // Backend checks if user has any current chargers (is a host)
    const response = await checkHost();
    console.log("Dashboard Response", response);

    if (response.message === "User is a host") {
      setHost(true);
    }
    setRequests(requests);
  } catch (err) {
    // Only throw an error if it's unexpected
    if (err.message === "User is not a host") return;
    setError(err);
  } finally {
    setLoading(false);
  }
}

export async function populateBookings(
  username,
  setBookings,
  setError,
  setLoading
) {
  try {
    setLoading(true);
    const bookings = await getUserBookings(username);
    console.log("API Bookings", bookings);
    setBookings(bookings);
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
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [host, setHost] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { store } = useGlobalState();
  const { currentUser, loggedInUser } = store;

  useEffect(() => {
    populateBookings(loggedInUser, setBookings, setError, setLoading);
    populateRequests(loggedInUser, setRequests, setHost, setError, setLoading);
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
      <div className="page-container" style={{ margin: "0 2em 2em" }}>
        <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
          Welcome Back {currentUser.firstName}!
        </Typography>

        {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
        {host &&
          (requests.length > 0 ? (
            <UserRequests requests={requests} styles={styles} host={host} />
          ) : (
            <NoResults message={"No requests... Yet! 🔌"} />
          ))}

        {/* NOTE: Not every host will have bookings */}
        {bookings.length > 0 ? (
          <UserBookings bookings={bookings} styles={styles} host={host} />
        ) : (
          <NoResults message={"You haven't made any bookings... Yet 😉"} />
        )}

        {!host && <BecomeHost />}
      </div>
    </>
  );
};
