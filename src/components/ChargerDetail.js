import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { ChargerCalendar } from "./ChargerCalendar";
import { useEffect, useState } from "react";
import { displayAUD } from "../utils/helpers";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import {
  deleteCharger,
  updateChargerStatus,
} from "../services/chargerServices";
import { createUserBookingRequest } from "../services/bookingServices";
import { AlertError } from "./AlertError";
import { AlertSuccess } from "./AlertSuccess";

export const ChargerDetail = ({ charger }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, errorMessage, editFormData, chargerStatus } = store;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Set charger status local state variables (status, checked)
    console.log("--> Charger status:", charger.status);

    if (charger.status === "active") {
      setStatus("Active");
      setChecked(true);
    }

    if (charger.status !== "active") {
      setStatus("Disabled");
      setChecked(false);
    }
  }, []);

  const updateStatus = async (e) => {
    let data = {};
    console.log("THIS IS DATA SENT", data);

    try {
      if (!checked) {
        data["status"] = "active";
        setStatus("Active");
      } else {
        data["status"] = "disabled";
        setStatus("Disabled");
      }

      const response = await updateChargerStatus(data, charger.id);
      setSuccess(response);
      console.log("Update successful");
      // navigate(`/chargers/mychargers`);
    } catch (err) {
      setError(err);
    }
  };

  // TODO: add logic to create booking in the backend
  const handleBooking = async () => {
    const bookings = [];

    try {
      for (let date of dates) {
        // Send date in ISO 8601 format
        bookings.push({
          // UserId retrieved in the backend
          // hours are set to midnight as currently full day bookings (MVP)
          ChargerId: charger.id,
          bookingDate: new Date(date).setHours(24, 0, 0, 0),
          price: charger.price,
          status: "pending",
          localTime: new Date(date).toDateString(),
        });
      }

      if (bookings.length === 0) {
        throw Error("No dates selected!");
      }
      const response = await createUserBookingRequest(bookings);
      setSuccess(response);
    } catch (err) {
      setError(err);
    } finally {
      setDates([]);
    }
  };

  const handleEdit = (e) => {
    // setEditFormData(charger)
    dispatch({
      type: "setEditFormData",
      data: charger,
    });
    // console.log("THIS IS FORM DATA WITH CHARGER DETAIL", editFormData);
    // return (
    //   <ChargerForm key={charger.id} editFormData={editFormData}/>
    // )
    navigate(`/charger/${charger.id}/edit`);
  };

  const handleSwitch = (e) => {
    setChecked(e.target.checked);
    updateStatus();

    dispatch({
      type: "setChargerStatus",
      data: e.target.checked,
    });
  };

  return (
    <>
      {success && (
        <AlertSuccess message={success.message} setError={setError} />
      )}
      {error && (
        <AlertError
          message={error.message}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
      <Container
        sx={{
          display: "inline-flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* TODO: This box is not display flex */}
        <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
          <img
            className="detailImage flex-box"
            src={charger.imageUrl}
            alt={charger.name}
          />

          <Typography gutterBottom variant="h5" component="div">
            <Link
              to={`/charger/${charger.id}`}
              style={{ textDecoration: "none" }}
            >
              {charger.name}
            </Link>
          </Typography>
          <Typography variant="h6">{displayAUD(charger.price)}</Typography>
          <Typography variant="h6">{charger.Address.city}</Typography>
          <Typography
            variant="body2 contained"
            color="text.secondary"
            style={{ maxWidth: "450px", marginBottom: "16px" }}
          >
            {charger.instructions}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6">Charger Status: {status}</Typography>

          <Box style={{ marginBottom: "16px" }}>
            <ChargerCalendar dates={dates} setDates={setDates} />
          </Box>
          {charger.Host.username === loggedInUser ? (
            <div className="flex-box">
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleSwitch} />}
                label="Activate"
              />
              <Button
                // type="submit"
                value="active"
                variant="contained"
                onClick={handleEdit}
                style={{ marginRight: "16px" }}
              >
                Edit
              </Button>
              <DeleteButton
                key={charger.id}
                charger={charger}
                setError={setError}
              />
            </div>
          ) : (
            <div className="flexBox">
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={
                  <FontAwesomeIcon
                    icon={faCalendarPlus}
                    style={{ fontSize: "16px" }}
                  />
                }
                onClick={handleBooking}
              >
                Book
              </Button>
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};

export default function DeleteButton({ charger, setError }) {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setOpen(false);
      console.log("CHARGER ID ", charger.id);
      await deleteCharger(charger.id);
      navigate(`/chargers/mychargers`);
    } catch (err) {
      setError(err);
    }
  };
  // TODO: to navigate to chargers/mychargers page but change the chargerlist in store

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Charger?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking Delete button below, all details of your charger will be
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
