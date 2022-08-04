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
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
// import TableFooter from "@mui/material/TableFooter";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePagination from "@mui/material/TablePagination";

import {
  displayAUD,
  displayLocalTime,
  capitalize,
  createUUID,
} from "../utils/helpers";
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

  // Checks if the user/host has any active bookings (not rejected/cancelled)
  const activeBookings = bookings
    .map((booking) => booking.status)
    .includes("approved", "pending");

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
                  <TableCell align={!isMobile ? "left" : "right"}>
                    {row.stationName}
                  </TableCell>
                  {!isMobileXS && (
                    <TableCell align="right">{row.price}</TableCell>
                  )}
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell
                    sx={{ color: statusColor[row.status], fontWeight: 600 }}
                    align="right"
                  >
                    {row.status}
                  </TableCell>
                  {/* Laptop/Desktop View */}
                  {!isTablet &&
                    (row.status === "Approved" || row.status === "Pending") && (
                      <TableCell
                        className="extra-cell"
                        align="center"
                        style={{ background: "#f1f1f180" }}
                      >
                        <ButtonGroup
                          variant="contained"
                          sx={{
                            width: "100%",
                            height: 35,
                            boxShadow: "none",
                          }}
                        >
                          {row.status === "Approved" && (
                            <LoadingButton
                              sx={{ width: "100%" }}
                              onClick={(e) => handlePayClick(e, row.id)}
                              loading={loading[row.id]?.pay}
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
                            sx={{ width: "100%" }}
                          >
                            Cancel
                          </LoadingButton>
                        </ButtonGroup>
                      </TableCell>
                    )}
                  {!isTablet &&
                    activeBookings &&
                    (row.status === "Rejected" ||
                      row.status === "Cancelled") && (
                      <TableCell
                        align="center"
                        style={{ background: "#f1f1f180" }}
                      ></TableCell>
                    )}
                </TableRow>
                {/* Mobile/Tablet View */}
                {isTablet &&
                  (row.status === "Approved" || row.status === "Pending") && (
                    <TableRow key={createUUID()}>
                      <TableCell
                        className="extra-cell"
                        colSpan={isTablet ? 5 : 4}
                        sx={{ padding: 1 }}
                      >
                        {(row.status === "Approved" ||
                          row.status === "Pending") && (
                          <ButtonGroup
                            variant="contained"
                            sx={{
                              width: "100%",
                              height: 35,
                              boxShadow: "none",
                              textAlign: "center",
                            }}
                          >
                            {row.status === "Approved" && (
                              <LoadingButton
                                onClick={(e) => handlePayClick(e, row.id)}
                                loading={loading[row.id]?.pay}
                                variant="contained"
                                color="success"
                                sx={{ width: "100%" }}
                              >
                                {!loading[row.id]?.pay && "Pay"}
                              </LoadingButton>
                            )}

                            <LoadingButton
                              onClick={(e) => handleCancelClick(e, row.id)}
                              loading={loading[row.id]?.cancel}
                              variant="contained"
                              color="error"
                              sx={{ width: "100%" }}
                            >
                              Cancel
                            </LoadingButton>
                          </ButtonGroup>
                        )}
                      </TableCell>
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
