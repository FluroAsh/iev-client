import { useGlobalState } from "../context/stateContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteCharger } from "../services/chargerServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    console.log("CHARGER ID ", charger.id);
    deleteConfirmed(charger.id)
      .then((response) => console.log(response.message))
      .then((err) => console.log(err));

    dispatch({
      type: "setChargerList",
      data: chargerList,
    });
    // TODO: to navigate to chargers/mychargers page but change the chargerlist in store
    navigate(`/chargers/mychargers`);
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
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const deleteConfirmed = async (id) => {
  deleteCharger(id);
};

export const ButtonGroup = ({ charger }) => {
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  const handleBooking = (e) => {
    navigate(`/charger/${charger.id}`);
  };

  const handleEdit = async (e) => {};
  return charger.Host.username === loggedInUser ? (
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
