import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";

import { displayAUD, displayLocalTime, capitalize } from "../utils/helpers";
import { Typography } from "@mui/material";
import {
  rejectUserRequest,
  approveUserRequest,
  getUserBookingRequests,
} from "../services/bookingServices";
import { useGlobalState } from "../context/stateContext";

const statusColor = {
  Approved: "#f57c00",
  Cancelled: "#d32f2f",
  Paid: "#2e7d32",
};

function createData(
  id,
  name,
  vehicle,
  price,
  bookingDate,
  sentDate,
  stationName,
  status
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
  };
}

export default function UserRequests({ setError, setSuccess }) {
  const [loading, setLoading] = React.useState([]);
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
      capitalize(request.status)
    );
  });

  async function refreshUserRequests() {
    const updatedRequests = await getUserBookingRequests(loggedInUser);
    dispatch({
      type: "setUserRequests",
      data: updatedRequests,
    });
  }

  async function handleConfirmation(RowId) {
    // row.id & request.id are the same id
    try {
      setLoading({ [RowId]: { confirm: true } });
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

  async function handleRejection(RowId) {
    try {
      setLoading({ [RowId]: { reject: true } });
      const response = await rejectUserRequest({ BookingId: RowId });
      refreshUserRequests();
      setSuccess(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({ [RowId]: { reject: false } });
    }
  }

  return (
    <>
      {/* /**
       * TODO:
       * 1. Add clickable row for popup actions
       * 2. Add pagination
       * 3. Add mobile conditionals (should not display some columns, change styling etc)
       */}

      <TableContainer sx={{ mb: 2 }} component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 2, background: "#e0e0e0" }} colSpan={7}>
                <Typography variant="h5">Requests</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Vehicle</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Booking Date</TableCell>
              <TableCell align="right">Sent Date</TableCell>
              <TableCell align="right">Station Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell component="th">{row.name}</TableCell>
                <TableCell align="right">{row.vehicle}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.bookingDate}</TableCell>
                <TableCell align="right">{row.sentDate}</TableCell>
                <TableCell align="right">{row.stationName}</TableCell>
                <TableCell className="extra-cell" align="center">
                  <ButtonGroup variant="contained">
                    {row.status === "Pending" && (
                      <>
                        <LoadingButton
                          onClick={() => handleConfirmation(row.id)}
                          loading={loading[row.id]?.confirm}
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ width: "50%" }}
                        >
                          <FontAwesomeIcon icon={faCheck} size="xl" />
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            handleRejection(row.id);
                          }}
                          loading={loading[row.id]?.reject}
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ width: "50%" }}
                        >
                          <FontAwesomeIcon icon={faXmark} size="xl" />
                        </LoadingButton>
                      </>
                    )}
                  </ButtonGroup>
                  {row.status === "Approved" && (
                    <span style={{ color: statusColor[row.status] }}>
                      Awaiting payment...
                    </span>
                  )}
                  {row.status === "Paid" && (
                    <span style={{ color: statusColor[row.status] }}>
                      Confirmed
                    </span>
                  )}
                  {row.status === "Cancelled" && (
                    <span style={{ color: statusColor[row.status] }}>
                      Confirmed
                    </span>
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
