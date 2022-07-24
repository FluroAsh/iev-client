import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
import { Button } from "@mui/material";
import { getCharger } from "../services/chargerServices";
import { Charger } from "./Charger";
import { ChargerCalendar } from "./ChargerCalendar";

export const ChargerDetail = ({ charger }) => {
  const { store } = useGlobalState();
  const { loggedInUser, chargerList } = store;

  return (
    // <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <div>
        <div>
          <Charger key={charger.id} charger={charger} />
        </div>
        <div>Owner reviews render the Reviews component here</div>
      </div>
      <div>
        <ChargerCalendar />
        {charger.User.username === loggedInUser ? (
          <div>
            <Button type="submit" value="active" variant="contained">
              Edit
            </Button>
            <Button type="submit" value="active" variant="contained">
              Delete
            </Button>
          </div>
        ) : (
          <Button type="submit" value="active" variant="contained">
            Add Booking
          </Button>
        )}
      </div>
    </div>
  );
};
