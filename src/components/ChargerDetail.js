import { Link, useNavigate } from "react-router-dom";
import { useGlobalState, StateContext } from "../context/stateContext";
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

export const ChargerDetail = ({ charger }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, errorMessage, editFormData, chargerStatus } = store;
  const navigate = useNavigate();


  let initalStatus;

  if (charger.status === "active") {
    initalStatus = true;
  } else {
    initalStatus = false;
  }

  const [checked, setStatus] = useState(initalStatus);

  useEffect(() => {
    const updateStatus = (e) => {
      let data = {};

      if (checked === true) {
        data["status"] = "active";
      } else {
        data["status"] = "disabled";
      }

      console.log("THIS IS DATA SENT", data);

      const response = updateChargerStatus(data, charger.id);

      if (response.status === 500) {
        dispatch({
          type: "setErrorMessage",
          data: response.data.message,
        });
        return;
      } else {
        // TODO: handle success message
        console.log("updated successful");
        navigate(`/chargers/mychargers`);
      }

      console.log("charger after created", response);
    };
    updateStatus();
  }, [chargerStatus, dispatch, charger.id, navigate, checked]);

  console.log("THIS IS STATUS", checked);

  useEffect(
    () => () =>
      dispatch({
        type: "setErrorMessage",
        data: "",
      }),
    [dispatch]
  );

  const handleBooking = (e) => {
    navigate(`/charger/${charger.id}`);
  };

  const handleEdit = async (e) => {
    // setEditFormData(charger)
    dispatch({
      type: "setEditFormData",
      data: charger,
    });
    console.log("THIS IS FORM DATA WITH CHARGER DETAIL", editFormData);
    // return (
    //   <ChargerForm key={charger.id} editFormData={editFormData}/>
    // )
    navigate(`/charger/${charger.id}/edit`);
  };

  const handleSwitch = (e) => {
    setStatus(e.target.checked);
    dispatch({
      type: "setChargerStatus",
      data: e.target.checked,
    });
  };

  return (
    <StateContext.Provider value={{ store, dispatch }}>
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
          <Typography variant="h6">Charger Status: {charger.status}</Typography>

          <FormControlLabel
            control={<Switch checked={checked} onChange={handleSwitch} />}
            label="Activate"
          />

          <Box style={{ marginBottom: "16px" }}>
            <ChargerCalendar />
          </Box>
          {charger.Host.username === loggedInUser ? (
            <div className="flex-box">
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
    </StateContext.Provider>
  );
};

export default function DeleteButton({ charger }) {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
