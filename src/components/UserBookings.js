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
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";
import { useGlobalState } from "../context/stateContext";
import {
  cancelBooking,
  confirmBooking,
  getUserBookings,
} from "../services/bookingServices";

const statusColor = {
  Pending: "#f57c00",
  Rejected: "#d32f2f",
  Cancelled: "#d32f2f",
  Approved: "#2e7d32",
  Paid: "#2e7d32",
};

function createData(id, city, stationName, price, date, status, chargerId) {
  return { id, city, stationName, price, date, status, chargerId };
}

export default function UserBookings({ setError, setSuccess }) {
  const [loading, setLoading] = React.useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      displayAUD(price),
      displayLocalTime(date),
      capitalize(status),
      booking.Charger.id
    );
  });

  async function refreshUserBookings() {
    const updatedBookings = await getUserBookings(loggedInUser);
    dispatch({
      type: "setUserBookings",
      data: updatedBookings,
    });
  }

  async function handlePayClick(e, RowId) {
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { pay: true } });
      const response = await confirmBooking({ BookingId: RowId });
      refreshUserBookings();
      setSuccess(response);
      // --> must wait for stripe checkout to complete before continuing
    } catch (err) {
      setError(err);
    } finally {
      setLoading({ [RowId]: { pay: false } });
    }
  }

  async function handleCancelClick(e, RowId) {
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { cancel: true } });
      if (!window.confirm("Are you sure you want to cancel your booking?")) {
        return;
      }
      const response = await cancelBooking({ BookingId: RowId });
      refreshUserBookings();
      setSuccess(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({ [RowId]: { cancel: false } });
    }
  }

  const handleRowClick = (chargerId) => {
    navigate(`/charger/${chargerId}`);
  };

  return (
    // /**
    //  * TODO:
    //  * 1. Add clickable row for popup actions ✅
    //  * 2. Add pagination
    //  * 3. Add mobile conditionals (should not display some columns, change styling etc)
    //  */
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell
                className="table-header"
                sx={{ p: 2, background: "#e0e0e0" }}
                colSpan={7}
              >
                <Typography variant="h5">Bookings</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {!isMobile && <TableCell>City</TableCell>}
              <TableCell align={isMobile ? "left" : "right"}>
                Station Name
              </TableCell>
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
                <TableCell align={isMobile ? "left" : "right"}>
                  {row.stationName}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell
                  sx={{ color: statusColor[row.status], fontWeight: 600 }}
                  align="right"
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">
                  {(row.status === "Approved" || row.status === "Pending") && (
                    // TODO: Add conditional buttons to render on a new row (2nd row) for mobile
                    <ButtonGroup variant="contained">
                      {row.status === "Approved" && (
                        <LoadingButton
                          sx={{ minWidth: "50%" }}
                          onClick={(e) => handlePayClick(e, row.id)}
                          loading={loading[row.id]?.pay}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          {!loading[row.id]?.pay && "Pay"}
                        </LoadingButton>
                      )}

                      <LoadingButton
                        onClick={(e) => handleCancelClick(e, row.id)}
                        loading={loading[row.id]?.cancel}
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
