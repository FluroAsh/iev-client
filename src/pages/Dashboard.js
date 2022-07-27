import React, { useEffect, useState } from "react";
import EnhancedTable from "../components/enhancedTable";
import { getUserBookings } from "../services/bookingServices";
import { useGlobalState } from "../context/stateContext";
import { CssLoader } from "../components/CssLoader";
import { ErrorScreen } from "../components/ErrorScreen";

export const Dashboard = () => {
  const [bookings, setBookings] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  useEffect(() => {
    populateBookings(loggedInUser, setBookings, setError, setLoading);
  }, []);

  // TODO: Determine if current user is host or regular user
  // ** 1. Has an active charging station
  // ** 2. Doesn't have an active charging station
  // >> Should be performed on the backend, return error: User is not a host, if
  return (
    <>
      {loading && <CssLoader />}
      {error && <ErrorScreen error={error} />}
      {bookings && (
        <>
          <h1>User/Host Bookings Dashboard</h1>
          <h3>Welcome Back {bookings[0].User.firstName}!</h3>
          {error && <p>{error.message}</p>}
          <EnhancedTable bookings={bookings} />
        </>
      )}
    </>
  );
};

async function populateBookings(
  username,
  setBookings,
  setError,
  setLoading,
  s
) {
  try {
    console.log("!");
    setLoading(true);
    const bookings = await getUserBookings(username);
    setBookings(bookings);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
