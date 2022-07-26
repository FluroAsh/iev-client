import React, { useEffect, useState } from "react";
import EnhancedTable from "../components/enhancedTable";
import { getUserBookings } from "../services/bookingServices";
import { useGlobalState } from "../context/stateContext";
import { CssLoader } from "../components/CssLoader";
import { ErrorScreen } from "../components/ErrorScreen";

export const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  useEffect(() => {
    populateBookings(loggedInUser, setBookings, setError, setLoading);
  }, []);

  return (
    <>
      {loading ? (
        <CssLoader />
      ) : (
        <>
          {error ? (
            <ErrorScreen error={error} />
          ) : (
            <>
              <h1>User/Host Bookings Dashboard</h1>
              <h3>Welcome Back {loggedInUser}!</h3>
              {error && <p>{error.message}</p>}
              <EnhancedTable bookings={bookings} />
            </>
          )}
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
