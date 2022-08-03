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

// import TableFooter from "@mui/material/TableFooter";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePagination from "@mui/material/TablePagination";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";
import { useGlobalState } from "../context/stateContext";

const { createStripeSession } = require("../services/paymentServices");

function createData(id, city, stationName, price, date, status) {
  return { id, city, stationName, price, date, status };
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function UserBookings() {
  const [loading, setLoading] = React.useState({});
  const { store } = useGlobalState();
  const { bookings } = store;

  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     setMessage("Order placed! You will receive an email confirmation.");
  //   }

  //   if (query.get("canceled")) {
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, []);

  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("bookings table", bookings);

  const rows = bookings.map((booking) => {
    const { bookingDate: date, status } = booking;
    const { name: stationName, price } = booking.Charger;
    const { city } = booking.Charger.Address;
    return createData(
      booking.id,
      city,
      stationName,
      // displayAUD(price),
      price,
      displayLocalTime(date),
      capitalize(status)
    );
  });

  const handlePayClick = async (setLoading, RowId, bookingDetail) => {
    try {
      setLoading({ [RowId]: true });

      bookingDetail.price = parseInt(bookingDetail.price);
      // handle the API request here
      const res = await createStripeSession(bookingDetail);
      console.log("THIS IS RESULTS FROM STRIPE POST REQUEST", res);

      //TODO: handle success and cancelled response from stripe
      // const url = res.url;
      // window.location.href = url
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
