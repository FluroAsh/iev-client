import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  displayAUD,
  displayLocalTime,
  capitalize,
  createUUID,
} from "../utils/helpers";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  rejectUserRequest,
  approveUserRequest,
  getUserBookingRequests,
} from "../services/bookingServices";
import { useGlobalState } from "../context/stateContext";
import { RequestStatusMobile } from "../layouts/RequestStatusMobile";
import { RequestStatusLarge } from "../layouts/RequestStatusLarge";

function createData(
  id,
  name,
  vehicle,
  price,
  bookingDate,
  sentDate,
  stationName,
  status,
  chargerId
) {
  return {
    id,
    name,
    vehicle,
    price,
    bookingDate,
    sentDate,
    stationName,
    status,
    chargerId,
  };
}

export default function UserRequests({ setError, setSuccess }) {
  const [loading, setLoading] = React.useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, bookingRequests } = store;

  // Populates table rows
  const rows = bookingRequests.map((request) => {
    return createData(
      request.id,
      request.User.firstName,
      request.User.UserVehicle.Vehicle.model,
      displayAUD(request.Charger.price),
      displayLocalTime(request.bookingDate),
      displayLocalTime(request.createdAt),
      request.Charger.name,
      capitalize(request.status),
      request.Charger.id
    );
  });

  async function refreshUserRequests() {
    const updatedRequests = await getUserBookingRequests(loggedInUser);
    dispatch({
      type: "setUserRequests",
      data: updatedRequests,
    });
  }

  async function handleConfirmation(e, RowId) {
    // row.id & request.id are the same id
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { confirm: true } });
      if (!window.confirm("Confirm this booking?")) {
        return;
      }
      const response = await approveUserRequest({ BookingId: RowId });
      refreshUserRequests();
      setSuccess(response);
    } catch (err) {
      setError(err.message);
    } finally {
      // BACKLOG/FUTURE ADDITION: Implement functionality to track multiple button states asynchronously
      setLoading({ RowId: { confirm: false } });
    }
  }

  async function handleRejection(e, RowId) {
    try {
      e.stopPropagation();
      setLoading({ [RowId]: { reject: true } });
      if (!window.confirm("Are you sure you want to reject this booking?")) {
        return;
      }
      const response = await rejectUserRequest({ BookingId: RowId });
      refreshUserRequests();
      setSuccess(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({ [RowId]: { reject: false } });
    }
  }

  const handleRowClick = (chargerId) => {
    navigate(`/charger/${chargerId}`);
  };

  return (
    // TODO: Add pagination for Tablet -> Desktop Screens ⚠️
    <>
      <TableContainer sx={{ mb: 2 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="requests table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header" sx={{ p: 2 }} colSpan={7}>
                <Typography variant="h5">Requests</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              {!isMobile && <TableCell align="right">Vehicle</TableCell>}
              {!isMobileXS && <TableCell align="right">Price</TableCell>}
              <TableCell align="right">Booking Date</TableCell>
              {!isTablet && <TableCell align="right">Sent Date</TableCell>}
              <TableCell align="right">Station Name</TableCell>
              {!isTablet && <TableCell></TableCell>}
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
                  <TableCell component="th">{row.name}</TableCell>

                  {!isMobile && (
                    <TableCell align="right">{row.vehicle}</TableCell>
                  )}

                  {!isMobileXS && (
                    <TableCell align="right">{row.price}</TableCell>
                  )}
                  <TableCell align="right">{row.bookingDate}</TableCell>
                  {!isTablet && (
                    <TableCell align="right">{row.sentDate}</TableCell>
                  )}
                  <TableCell align="right">{row.stationName}</TableCell>
                  {/* Laptop/Desktop View */}
                  {!isTablet && (
                    <RequestStatusLarge
                      row={row}
                      loading={loading}
                      handleConfirmation={handleConfirmation}
                      handleRejection={handleRejection}
                    />
                  )}
                </TableRow>
                {/* Mobile/Tablet View - 'Wrapped' 2nd Row */}
                {isTablet && (
                  <TableRow key={createUUID()}>
                    <RequestStatusMobile
                      row={row}
                      loading={loading}
                      handleConfirmation={handleConfirmation}
                      handleRejection={handleRejection}
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
