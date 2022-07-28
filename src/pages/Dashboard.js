import React, { useEffect, useState } from "react";
import UserBookings from "../components/UserBookings";
import UserRequests from "../components/UserRequests";
import {
  getUserBookingRequests,
  getUserBookings,
} from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

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
    setError(err);
  } finally {
    setLoading(false);
  }
}

const NoResults = ({ message }) => {
  return (
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
      <p>{message}</p>
    </div>
  );
};

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
  console.log(error);
  console.log("Host", host);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {/* Below 2 lines of code will probably be replaced.. Ignore for now */}
      {/* {loading && <CssLoader />} */}
      {/* {error && <ErrorScreen error={error} />} */}

      {/* NOTE: Not every host will have bookings */}

      <div className="page-container" style={{ margin: "0 2em 2em" }}>
        <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
          Welcome Back (firstName)!
          {/* {requests
            ? requests[0].Charger.Host.firstName
            : bookings[0].User.firstName} */}
        </Typography>
        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
        {host &&
          (requests.length > 0 ? (
            <UserRequests requests={requests} styles={styles} host={host} />
          ) : (
            <NoResults message={"No requests... Yet!"} />
          ))}

        {bookings.length > 0 ? (
          <>
            <UserBookings bookings={bookings} styles={styles} host={host} />
          </>
        ) : (
          <NoResults message={"You haven't made any bookings... Yet 😉"} />
        )}

        {!host && <BecomeHost />}
      </div>
    </>
  );
};

const BecomeHost = () => {
  return (
    <div className="host-container">
    <div className="host">
      <Typography variant="p" sx={{padding: "0 10px 10px"}}>
        Looking to become a host? Click below to create your first charging
        station!
      </Typography>
      <Button variant="contained">Become a Host</Button>
    </div>
    </div>
  );
};