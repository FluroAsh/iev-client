import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../context/stateContext";
// import { Card, CardContent, Typography } from "@mui/material";
import { getCharger } from "../services/chargerServices";
import { Charger } from "./Charger";

export const ChargerDetail = () => {
  const { store } = useGlobalState();
  const { loggedInUser, chargerList } = store;
  const { chargerId } = useParams();

  console.log("CHARGERID", chargerId)
  const [charger, setChargerDetail] = useState();

  useEffect(() => {
    getChargerById(chargerId)
      .then((data) => {console.log("THIS IS DATA", data); setChargerDetail(data)})
  }, [chargerId]);


  console.log("THIS IS CHARGER", charger);
  return (
    <>
      { (charger !== undefined) ? (
        <>
          <div>
            <Charger key={charger.id} charger={charger} />
          </div>
          <div>{Object.values(charger.Address).join(" ")}</div>
          <div>Owner reviews</div>
          <div>Calendar</div>
          {charger.User.username === loggedInUser ? (
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          ) : (<button>Add Booking</button>
          )}
        </>
      ) : (
        <>
          <p>charger not found</p>
          <Link to="/chargers">Go back to the main page</Link>
        </>
      )}
    </>
  );
};

async function getChargerById(chargerId) {
  try {
    const chargerDetails = await getCharger(chargerId);
    return chargerDetails;
  } catch (err) {
    console.log(err.message);
  }
}
