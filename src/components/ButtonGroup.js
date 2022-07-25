import { useGlobalState } from "../context/stateContext";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

export const ButtonGroup = ({ charger }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  const handleBooking = (e) => {};

  const handleEdit = (e) => {};

  const handleDelete = (e) => {};

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
      <Button
        type="submit"
        value="active"
        variant="contained"
        onClick={handleDelete}
      >
        Delete
      </Button>
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
