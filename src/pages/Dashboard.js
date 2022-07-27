import React, { useEffect, useState } from "react";
import UserBookings from "../components/UserBookings";
import { getUserBookings } from "../services/bookingServices";
import { CssLoader } from "../components/CssLoader";
import { ErrorScreen } from "../components/ErrorScreen";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const Dashboard = () => {
  const [bookings, setBookings] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { username } = useParams();

  useEffect(() => {
    console.log(username);
    populateBookings(username, setBookings, setError, setLoading);
  }, []);

  const styles = {
    // user.host && styles.host.tableheight ()
    host: {
      tableHeight: "45vw",
    },
  };

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
              Welcome Back {bookings[0].User.firstName}!
            </Typography>

            <UserBookings bookings={bookings} />
            {/* Is Host? Render Requests, otherwise render 'Become a Host' */}
            {/* UserRequests */}
          </div>
        </>
      )}
    </>
  );
};

async function populateBookings(username, setBookings, setError, setLoading) {
  try {
    setLoading(true);
    const bookings = await getUserBookings(username);
    setBookings(bookings);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
