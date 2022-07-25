import { Link } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { ChargerCalendar } from "./ChargerCalendar";
import { handleBooking } from "../pages/ViewCharger";
import { Container, Typography, Button, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { displayAUD } from "../utils/helpers";
import { ButtonGroup } from "./ButtonGroup";

export const ChargerDetail = ({ charger }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  return (
    // <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Container
      sx={{
        display: "inline-flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        // flexDirection: "row"
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
      {/* <div className="flex-box flex-vert">
        <div className="flex-box">
          <ChargerCalendar />
        </div> */}
      <Box>
        <Box style={{ marginBottom: "16px" }}>
          <ChargerCalendar />
        </Box>
        <ButtonGroup key={charger.id} charger={charger} />
        {/* {charger.User.username === loggedInUser ? (
          <div className="flexBox">
            <Button type="submit" value="active" variant="contained">
              Edit
            </Button>
            <Button type="submit" value="active" variant="contained">
              Delete
            </Button>
          </div>
        ) : (
          <div className="flexBox">
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ marginTop: "16px" }}
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
        )} */}
      </Box>
    </Container>
  );
};
