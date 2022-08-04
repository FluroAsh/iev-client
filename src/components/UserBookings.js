import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";
import { useGlobalState } from "../context/stateContext";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LSoj4KET1RwVGwUk9pp97jPW5HE0LOu0bpxtKqCfsgtb2WfRChRKOQTnkhfcVMfFjngjEDlBWkCgYgRVulTScwe00oRX9gUl9"
);

// import TableFooter from "@mui/material/TableFooter";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePagination from "@mui/material/TablePagination";

const { createStripeSession } = require("../services/paymentServices");

function createData(id, city, stationName, price, date, status) {
  return { id, city, stationName, price, date, status };
}

export default function UserBookings() {
  const [loading, setLoading] = React.useState({});
  const { store } = useGlobalState();
  const { bookings } = store;

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
      capitalize(status)
    );
  });

  const handlePayClick = async (setLoading, RowId, bookingDetail) => {
    try {
      setLoading({ [RowId]: true });

      const res = await createStripeSession(bookingDetail);
      console.log("THIS IS RESULTS FROM STRIPE POST REQUEST", res);

      // Redirect to strip check out session form
      window.location.href = res.url
      //TODO: handle success and cancelled response from stripe
    } catch (err) {
      console.log("THIS IS STRIPE ERROR", err);
      // catch the error here
    } finally {
      setLoading({ [RowId]: false });
    }
  };

  const handleCancelClick = (setLoading, RowId) => {
    try {
      setLoading({ [RowId]: true });
      // handle the API request here
    } catch (err) {
      // catch the error here
    } finally {
      // setloading(false)
    }
  };

  return (
    /**
     * TODO:
     * 1. Add clickable row for popup actions
     * 2. Add pagination
     * 3. Add mobile conditionals (should not display some columns, change styling etc)
     */
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 2, background: "#e0e0e0" }} colSpan={7}>
                <Typography variant="h5">Bookings</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell align="right">Station Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Booking Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textDecoration: "none",
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  {row.city}
                </TableCell>
                <TableCell align="right">{row.stationName}</TableCell>
                <TableCell align="right">{displayAUD(row.price)}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="center">
                  {(row.status === "Approved" || row.status === "Pending") && (
                    // TODO: Render modals/dialog for confirming actions
                    <ButtonGroup variant="contained">
                      {row.status === "Approved" && (
                        <LoadingButton
                          sx={{ minWidth: "50%" }}
                          onClick={() =>
                            handlePayClick(setLoading, row.id, row)
                          }
                          loading={loading[row.id]}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          {!loading[row.id] && "Pay"}
                        </LoadingButton>
                      )}

                      <LoadingButton
                        onClick={() => handleCancelClick(setLoading, row.id)}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        Cancel
                      </LoadingButton>
                    </ButtonGroup>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
