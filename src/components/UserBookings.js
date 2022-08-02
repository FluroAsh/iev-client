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
// import TableFooter from "@mui/material/TableFooter";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePagination from "@mui/material/TablePagination";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";

function createData(id, city, stationName, price, date, status) {
  return { id, city, stationName, price, date, status };
}

export default function UserBookings({ bookings }) {
  const [loading, setLoading] = React.useState({});

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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="center">
                {/* 
                  Approved = Show 'PAY/CANCEL'
                  Pending = SHOW 'CANCEL'

                  Paid = Show NO BUTTONS
                  Rejected = Show NO BUTTONS
                */}
                {console.log(row.status === "Approved")}
                {(row.status === "Approved" || row.status === "Pending") && (
                  // TODO: Render modals/dialog for confirming actions

                  <ButtonGroup variant="contained">
                    {row.status === "Approved" && (
                      <LoadingButton
                        onClick={() => handlePayClick(setLoading, row.id)}
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
  );
}

const handlePayClick = (setLoading, RowId) => {
  try {
    setLoading({ [RowId]: true });
    // handle the API request here
  } catch (err) {
    // catch the error here
  } finally {
    // setLoading({ [RowId]: false });
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
