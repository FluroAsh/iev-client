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

import { displayAUD, displayLocalTime } from "../utils/helpers";
import { Button, Toolbar, Typography } from "@mui/material";

function createData(
  id,
  name,
  vehicle,
  price,
  bookingDate,
  sentDate,
  stationName
) {
  return { id, name, vehicle, price, bookingDate, sentDate, stationName };
}

export default function BasicTable({ requests, styles, host }) {
  const rows = requests.map((request, i) => {
    /**
     * Name, Vehicle, Price, Booking Date, Date Sent, Station Name
     */
    console.log(request.User.UserVehicle.Vehicle.make);
    return createData(
      i,
      request.User.firstName,
      // request.User.UserVehicle.Vehicle.model,
      request.User.UserVehicle.Vehicle.model,
      displayAUD(request.Charger.price),
      displayLocalTime(request.bookingDate),
      displayLocalTime(request.createdAt),
      request.Charger.name
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
        <Typography variant="h5">Requests</Typography>
      </Toolbar>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
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
              <TableCell align="center">
                <ButtonGroup variant="contained">
                  <Button color="success" size="small" sx={{ width: "50%" }}>
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  </Button>
                  <Button color="error" size="small" sx={{ width: "50%" }}>
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
