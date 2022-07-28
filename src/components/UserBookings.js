import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import TableFooter from "@mui/material/TableFooter";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePagination from "@mui/material/TablePagination";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";

function createData(id, city, stationName, price, date, status) {
  return { id, city, stationName, price, date, status };
}

export default function UserBookings({ bookings }) {
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
      displayAUD(price),
      displayLocalTime(date),
      capitalize(status)
    );
  });

  return (
    /**
     * TODO:
     * 1. Add clickable row for popup actions
     * 2. Add pagination
     * 3. Add mobile conditionals (should not display some columns, change styling etc)
     */
    <TableContainer component={Paper}>
      <Toolbar sx={{ Width: "100%" }}>
        <Typography variant="h5">My Bookings</Typography>
      </Toolbar>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="center">
                {row.status === "Pending" && (
                  // TODO: Render modals/dialog for confirming actions
                  <ButtonGroup variant="contained" sx={{ zIndex: 999999 }}>
                    <Button color="success" size="small">
                      Pay
                    </Button>
                    <Button
                      // loading
                      // loadingPosition="start"
                      color="error"
                      size="small"
                      onClick={() => console.log("Cancelling...")}
                      // disable={1 + 1 === 2 ? false : true}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
