import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

import { useGlobalState } from "../context/stateContext";
import { bookingStatusColor } from "../styles/statusColor";

import {
  displayAUD,
  displayLocalTime,
  capitalize,
  createUUID,
} from "../utils/helpers";
import {
  cancelBooking,
  confirmBooking,
  getUserBookings,
} from "../services/bookingServices";
import { BookingStatusMobile } from "../layouts/BookingStatusMobile";
import { BookingStatusLarge } from "../layouts/BookingStatusLarge";

const { createStripeSession } = require("../services/paymentServices");
loadStripe(
  "pk_test_51LSoj4KET1RwVGwUk9pp97jPW5HE0LOu0bpxtKqCfsgtb2WfRChRKOQTnkhfcVMfFjngjEDlBWkCgYgRVulTScwe00oRX9gUl9"
);

function createData(id, city, stationName, price, date, status, chargerId) {
  return { id, city, stationName, price, date, status, chargerId };
}

// useEffect(() => {

// })

export default function UserBookings() {
  const [loading, setLoading] = React.useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, bookings } = store;

  // Populates table rows
  const rows = bookings.map((booking) => {
    const { bookingDate: date, status } = booking;
    const { name: stationName, price } = booking.Charger;
    const { city } = booking.Charger.Address;
    return createData(
      booking.id,
      city,
      stationName,
      price,
      displayLocalTime(date),
      capitalize(status),
      booking.Charger.id
    );
  });

  // Refreshes bookings after an action is made with no error (cancelled, payed etc.)
  async function refreshUserBookings() {
    const updatedBookings = await getUserBookings(loggedInUser);
    dispatch({
      type: "setUserBookings",
      data: updatedBookings,
    });
  }

  const handlePayClick = async (e, RowId, bookingDetail) => {
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { pay: true } });

      // Creates the stripe session with
      const res = await createStripeSession(bookingDetail);
      // Redirect to strip check out session form
      window.location.href = res.url;

      // TODO: handle success and cancelled response from stripe
      const response = await confirmBooking({ BookingId: RowId });

      refreshUserBookings();
      dispatch({
        type: "setSuccessMessage",
        data: response.message,
      });
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
    } finally {
      setLoading({ [RowId]: { pay: false } });
    }
  };

  async function handleCancelClick(e, RowId) {
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { cancel: true } });
      if (!window.confirm("Are you sure you want to cancel your booking?")) {
        return;
      }
      const response = await cancelBooking({ BookingId: RowId });
      refreshUserBookings();
      dispatch({
        type: "setSuccessMessage",
        data: response.message,
      });
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
    } finally {
      setLoading({ [RowId]: { cancel: false } });
    }
  }

  const handleRowClick = (chargerId) => {
    navigate(`/charger/${chargerId}`);
  };

  // Checks if the user/host has any active bookings (not rejected/cancelled)
  const activeBookings = bookings
    .map((booking) => booking.status)
    .find((element) => element === "approved" || element === "pending");

  return (
    <>
      <TableContainer component={Paper} key={createUUID()}>
        <Table sx={{ minWidth: 350 }} aria-label="bookings table">
          <TableHead key={createUUID()}>
            <TableRow key={createUUID()}>
              <TableCell
                className="table-header"
                sx={{ p: 2, background: "#e0e0e0" }}
                colSpan={7}
              >
                <Typography variant="h5">Bookings</Typography>
              </TableCell>
            </TableRow>
            <TableRow key={createUUID()}>
              {!isMobile && <TableCell>City</TableCell>}
              <TableCell align={isTablet ? "left" : "right"}>
                Station Name
              </TableCell>
              {!isMobileXS && <TableCell align="right">Price</TableCell>}
              <TableCell align="right">Booking Date</TableCell>
              <TableCell align="right">Status</TableCell>
              {!isTablet && activeBookings && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={createUUID()}>
                <TableRow
                  key={createUUID()}
                  onClick={() => handleRowClick(row.chargerId)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textDecoration: "none",
                  }}
                  hover
                >
                  {!isMobile && (
                    <TableCell component="th" scope="row">
                      {row.city}
                    </TableCell>
                  )}
                  <TableCell align={isTablet ? "left" : "right"}>
                    {row.stationName}
                  </TableCell>
                  {!isMobileXS && (
                    <TableCell align="right">{displayAUD(row.price)}</TableCell>
                  )}
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell
                    sx={{
                      color: bookingStatusColor[row.status],
                      fontWeight: 600,
                    }}
                    align="right"
                  >
                    {row.status}
                  </TableCell>
                  {/* Laptop/Desktop View */}
                  {!isTablet &&
                    (row.status === "Approved" || row.status === "Pending") && (
                      <BookingStatusLarge
                        row={row}
                        loading={loading}
                        handlePayClick={handlePayClick}
                        handleCancelClick={handleCancelClick}
                      />
                    )}
                  {/* Renders empty cell for Rejected/Cancelled if there are active bookings */}
                  {activeBookings &&
                    !isTablet &&
                    !isMobile &&
                    (row.status === "Cancelled" ||
                      row.status === "Rejected") && (
                      <TableCell
                        align="center"
                        style={{ background: "#f1f1f180" }}
                      ></TableCell>
                    )}
                </TableRow>
                {/* Mobile/Tablet View - 'Wrapped' 2nd Row */}
                {isTablet &&
                  (row.status === "Approved" || row.status === "Pending") && (
                    <TableRow key={createUUID()}>
                      <BookingStatusMobile
                        row={row}
                        loading={loading}
                        handlePayClick={handlePayClick}
                        handleCancelClick={handleCancelClick}
                        activeBookings={activeBookings}
                      />
                    </TableRow>
                  )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
