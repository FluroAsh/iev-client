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
    setBookings([]);
    setRequests([]);
    populateBookings(username, setBookings, setError, setLoading);
    populateRequests(username, setRequests, setHost, setError, setLoading);
  }, [username]);

  // TODO: Pass styles as prop based on if user is a prop or not
  // this is to resize the tables to the correct height & ??? etc.
  const styles = {
    // user.host && styles.host.tableheight ()
    host: {
      tableHeight: "45vw",
    },
  };

  console.log("host?", host);
  console.log("stored requests", requests);
  console.log("stored bookings", bookings);

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

      {bookings.length > 0 && (
        <>
          <div className="page-container" style={{ margin: "0 2em" }}>
            <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
              Welcome Back{" "}
              {requests
                ? requests[0].Charger.Host.firstName
                : bookings[0].User.firstName}
              !
            </Typography>
            <UserBookings bookings={bookings} />
            {/* <UserRequests /> is causing booking undefined for some reason... ? */}
          </div>
        </>
      )}

      {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
      {requests.length > 0 && <UserRequests requests={requests} />}
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
