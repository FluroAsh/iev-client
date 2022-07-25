import { Link } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { ChargerCalendar } from "./ChargerCalendar";
import { Container, Typography, Button, Box } from "@mui/material";

import { displayAUD } from "../utils/helpers";
import { ButtonGroup } from "./ButtonGroup";

export const ChargerDetail = ({ charger }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  return (
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
  );
};
