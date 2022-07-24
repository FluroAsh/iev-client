import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
// import { Card, CardContent, Typography } from "@mui/material";
import { getCharger } from "../services/chargerServices";
import { Charger } from "./Charger";

export const ChargerDetail = ({ charger }) => {
  const { store } = useGlobalState();
  const { loggedInUser, chargerList } = store;

  return (
    <>
      <div>
        <Charger key={charger.id} charger={charger} />
      </div>
      <div>{Object.values(charger.Address).join(" ")}</div>
      <div>Owner reviews</div>
      <div>Calendar</div>
      {charger.Host.username === loggedInUser ? (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ) : (
        <button>Add Booking</button>
      )}
    </>
  );
};
