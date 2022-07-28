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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteCharger } from "../services/chargerServices";

export const ChargerDetail = ({ charger }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, errorMessage } = store;

  return (
    <StateContext.Provider value={{ store, dispatch }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
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
          <Typography variant="h6">
            {Object.values(charger.Address.city)}
          </Typography>
          <Typography variant="body2 contained" color="text.secondary">
            {charger.instructions}
          </Typography>
        </Box>
        <Box>
          <Box style={{ marginBottom: "16px" }}>
            <ChargerCalendar />
          </Box>
          <ButtonGroup key={charger.id} charger={charger} />
        </Box>
      </Container>
    </StateContext.Provider>
  );
};

export default function AlertDialog({ charger }) {
  const { store, dispatch } = useGlobalState();
  const { chargerList } = store;

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
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

export const ButtonGroup = ({ charger }) => {
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  const handleBooking = (e) => {
    navigate(`/charger/${charger.id}`);
  };

  const handleEdit = async (e) => {};
  return charger.User.username === loggedInUser ? (
    <div className="flexBox">
      <Button
        type="submit"
        value="active"
        variant="contained"
        onClick={handleEdit}
        style={{ marginRight: "16px" }}
      >
        Edit
      </Button>
      <AlertDialog key={charger.id} charger={charger} />
    </div>
  ) : (
    <div className="flexBox">
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={
          <FontAwesomeIcon icon={faCalendarPlus} style={{ fontSize: "16px" }} />
        }
        onClick={handleBooking}
      >
        Book
      </Button>
    </div>
  );
};
