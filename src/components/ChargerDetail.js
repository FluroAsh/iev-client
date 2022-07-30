import { Link, useNavigate } from "react-router-dom";
import { useGlobalState, StateContext } from "../context/stateContext";
import { ChargerCalendar } from "./ChargerCalendar";
import { useEffect, useRef, useState } from "react";
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
import { ErrorAlert } from "./ErrorAlert";

export const ChargerDetail = ({ charger }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, errorMessage, editFormData, chargerStatus } = store;
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

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

      await updateChargerStatus(data, charger.id);

      // if (response.status === 500) {
      //   dispatch({
      //     type: "setErrorMessage",
      //     data: response.data.message,
      //   });
      // }

      // TODO: handle success message
      console.log("Update successful");
      // console.log("charger after created", response);
      // navigate(`/chargers/mychargers`);
    } catch (err) {
      setError(err);
    }
  };

  // TODO: add logic to create booking in the backend
  const handleBooking = (e) => {
    navigate(`/charger/${charger.id}`);
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
      {error && <ErrorAlert message={error.message} setError={setError} />}
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
            <ChargerCalendar />
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
              <DeleteButton key={charger.id} charger={charger} />
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

export default function DeleteButton({ charger }) {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    console.log("CHARGER ID ", charger.id);
    const response = await deleteCharger(charger.id);

    if (response.status === 401) {
      dispatch({
        type: "setErrorMessage",
        data: response.data.message,
      });
      return;
    }
    navigate(`/chargers/mychargers`);
    // TODO: to navigate to chargers/mychargers page but change the chargerlist in store
  };

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
