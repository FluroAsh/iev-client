import React, { useEffect, useState } from "react";
import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserRequests";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { ErrorScreen } from "../components/ErrorScreen";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [host, setHost] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { username } = useParams();

  useEffect(() => {
    populateBookings(username, setBookings, setError, setLoading);
    populateRequests(username, setRequests, setHost, setError, setLoading);
  }, [username]);

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
      {/* Below 2 lines of code will probably be replaced.. Ignore for now */}
      {/* {loading && <CssLoader />} */}
      {/* {error && <ErrorScreen error={error} />} */}

      {/* {error && <p>{error.message}</p>} */}
      {/* NOTE: Not every host will have bookings */}

      <div className="page-container" style={{ margin: "2em" }}>
        <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
          Welcome Back (firstName)
          {/* {requests
            ? requests[0].Charger.Host.firstName
            : bookings[0].User.firstName} */}
        </Typography>
        {bookings.length > 0 ? (
          <>
            <UserBookings bookings={bookings} />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "200px",
              border: "2px solid black",
              margin: "2em 0",
            }}
          >
            <p>You haven't made any bookings... Yet 😉</p>
          </div>
        )}

        {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
        {requests.length > 0 && host ? (
          <UserRequests requests={requests} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "200px",
              border: "2px solid black",
              margin: "2em 0",
            }}
          >
            <p>No requests... Yet! </p>
          </div>
        )}
      </div>
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
    setLoading(true);
    console.log(">>> Setting requests");
    let requests = await getUserBookingRequests(username);
    console.log("API requests", requests);
    /** Found requests, so the user must be a host.
     * The below won't run if the API service throws an error */
    setHost(true);
    setRequests(requests);
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
  console.log(">>> Setting bookings");
  try {
    setLoading(true);
    const bookings = await getUserBookings(username);
    console.log("API Bookings", bookings);
    setBookings(bookings);
  } catch (err) {
    console.log("API Error", err);
    // console.log(bookings);

    setError(err);
  } finally {
    setLoading(false);
  }
}
