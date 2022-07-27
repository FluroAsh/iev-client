import React, { useEffect, useState } from "react";
import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserBookings";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { ErrorScreen } from "../components/ErrorScreen";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const Dashboard = () => {
  const [bookings, setBookings] = useState();
  const [requests, setRequests] = useState();
  const [host, setHost] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { username } = useParams();

  useEffect(() => {
    populateBookings(username, setBookings, setError, setLoading);
    populateRequests(username, setRequests, setHost, setError, setLoading);
  }, []);

  // TODO: Pass styles as prop based on if user is a prop or not
  // this is to resize the tables to the correct height & ??? etc.
  const styles = {
    // user.host && styles.host.tableheight ()
    host: {
      tableHeight: "45vw",
    },
  };

  console.log("host?", host);
  console.log("requests", requests);
  console.log("bookings", bookings);

  // TODO: Determine if current user is host or regular user
  // ** 1. Has an active charging station (API Request, search user
  // ** 2. Doesn't have an active charging station
  // >> Should be performed on the backend, return error: User is not a host, if
  return (
    <>
      {loading && <CssLoader />}
      {error && <ErrorScreen error={error} />}
      {bookings && (
        <>
          <div className="page-container" style={{ margin: "0 2em" }}>
            <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
              Welcome Back{" "}
              {host
                ? requests[0].Charger.Host.firstName
                : bookings[0].User.firstName}
              !
            </Typography>

            <UserBookings bookings={bookings} />
            {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
            {/* <UserRequests/> is causing booking undefined for some reason... ? */}
            {/* {host &&
              requests.map((request) => {
                return <p>{request.Charger.name}</p>;
              })} */}
          </div>
        </>
      )}
    </>
  );
};

export async function populateRequests(
  username,
  setRequests,
  setHost,
  setError,
  setLoading
) {
  try {
    let requests = await getUserBookingRequests(username);
    if (requests) {
      /** Found requests, so the user must be a host */
      setHost(true);
      let data = requests.filter((request) => request.Charger !== null);
      setRequests(data || []);
    }
  } catch (err) {
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
    // check if user is a host
    console.log("bookings", bookings);
    setBookings(bookings);
  } catch (err) {
    setError(err);
  }
}
