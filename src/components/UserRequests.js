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

const statusColor = {
  Approved: "#f57c00",
  Cancelled: "#d32f2f",
  Paid: "#2e7d32",
  background: {
    Approved: "#aa7c00",
  },
};

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
    // /**
    //  * TODO:
    //  * 1. Add clickable row for popup actions ✅
    //  * 2. Add pagination for Tablet -> Desktop Screens
    //  * 3. Add mobile conditionals (should not display some columns, change styling etc) ✅
    //  */
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
                    <TableCell
                      className="extra-cell"
                      align="center"
                      style={{ background: "#f1f1f180" }}
                    >
                      <ButtonGroup
                        variant="contained"
                        sx={{ width: "100%", boxShadow: "none" }}
                      >
                        {row.status === "Pending" && (
                          <>
                            <LoadingButton
                              onClick={(e) => handleConfirmation(e, row.id)}
                              loading={loading[row.id]?.confirm}
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ width: "100%", height: 35 }}
                            >
                              <FontAwesomeIcon icon={faCheck} size="xl" />
                            </LoadingButton>
                            <LoadingButton
                              onClick={(e) => handleRejection(e, row.id)}
                              loading={loading[row.id]?.reject}
                              variant="contained"
                              color="error"
                              size="small"
                              sx={{ width: "100%", height: 35 }}
                            >
                              <FontAwesomeIcon icon={faXmark} size="xl" />
                            </LoadingButton>
                          </>
                        )}
                        {row.status === "Approved" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Awaiting payment...
                          </span>
                        )}
                        {row.status === "Paid" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Confirmed
                          </span>
                        )}
                        {row.status === "Cancelled" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Confirmed
                          </span>
                        )}
                      </ButtonGroup>
                    </TableCell>
                  )}
                </TableRow>
                {/* Mobile/Tablet View */}
                {isTablet && (
                  <TableRow key={createUUID()}>
                    <TableCell
                      className="extra-cell"
                      colSpan={isMobile ? 4 : 5}
                      sx={{ padding: 1 }}
                    >
                      <ButtonGroup
                        variant="contained"
                        sx={{
                          width: "100%",
                          height: 35,
                          boxShadow: "none",
                        }}
                      >
                        {row.status === "Pending" && (
                          <>
                            <LoadingButton
                              onClick={(e) => handleConfirmation(e, row.id)}
                              loading={loading[row.id]?.confirm}
                              variant="contained"
                              color="success"
                              sx={{ width: "100%" }}
                            >
                              <FontAwesomeIcon icon={faCheck} size="xl" />
                            </LoadingButton>
                            <LoadingButton
                              onClick={(e) => handleRejection(e, row.id)}
                              loading={loading[row.id]?.reject}
                              variant="contained"
                              color="error"
                              sx={{ width: "100%" }}
                            >
                              <FontAwesomeIcon icon={faXmark} size="xl" />
                            </LoadingButton>
                          </>
                        )}
                        {row.status === "Approved" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Awaiting payment...
                          </span>
                        )}
                        {row.status === "Paid" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Confirmed
                          </span>
                        )}
                        {row.status === "Cancelled" && (
                          <span
                            style={{
                              color: statusColor[row.status],
                            }}
                          >
                            Confirmed
                          </span>
                        )}
                      </ButtonGroup>
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
