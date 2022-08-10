import { useNavigate } from "react-router-dom";
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
export const ChargerDetail = ({ charger }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (charger.status === "active") {
      setStatus("Active");
      setChecked(true);
    }

    if (charger.status !== "active") {
      setStatus("Disabled");
      setChecked(false);
    }
  }, [charger.status]);

  const updateStatus = async () => {
    let data = {};

    try {
      if (!checked) {
        data["status"] = "active";
        setStatus("Active");
      } else {
        data["status"] = "disabled";
        setStatus("Disabled");
      }

      const response = await updateChargerStatus(data, charger.id);
      dispatch({
        type: "setSuccessMessage",
        data: response.message,
      });
      // navigate(`/chargers/mychargers`);
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
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

      dispatch({
        type: "setSuccessMessage",
        data: response.message,
      });
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
    } finally {
      setDates([]);
    }
  };

  const handleEdit = () => {
    dispatch({
      type: "setEditFormData",
      data: charger,
    });

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
    <Container
      sx={{
        display: "inline-flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "inline-flex", flexDirection: "column", margin: 2 }}>
        <img
          className="detailImage flex-box"
          src={charger.imageUrl}
          alt={charger.name}
        />

        <Typography gutterBottom variant="h5">
          {charger.name}
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

      <div className="calendar">
        <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
          <Typography variant="h6">Charger Status: {status}</Typography>
          <Box style={{ marginBottom: "16px", marginTop: "16px" }}>
            <ChargerCalendar dates={dates} setDates={setDates} />
          </Box>
          {charger.Host.username === loggedInUser ? (
            <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
              {" "}
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleSwitch} />}
                label="Activate"
              />
              <Box sx={{ display: "inline-flex", flexDirection: "row" }}>
                <Button
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
                  dispatch={dispatch}
                />
              </Box>
            </Box>
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
      </div>
    </Container>
  );
};

export default function DeleteButton({ charger, dispatch }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setOpen(false);
      await deleteCharger(charger.id);
      navigate(`/chargers/mychargers`);
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
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
