import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { Card, CardContent, Typography } from "@mui/material";
import { getCharger } from "../services/chargerServices";
import { ChargerDetail } from "../components/ChargerDetail";
import { CssLoader } from "../components/CssLoader";

export const ViewCharger = () => {
  const { chargerId } = useParams();

  console.log("CHARGERID", chargerId);
  const [charger, setChargerDetail] = useState();
  const [loading, setLoading] = useState(false);
  // TODO: Add error state

  useEffect(() => {
    async function getChargerById(chargerId) {
      try {
        setLoading(true);
        const chargerDetails = await getCharger(chargerId);
        setChargerDetail(chargerDetails);
        console.log("THIS IS CHARGER DETAILS", chargerDetails);
      } catch (err) {
        console.log(err.message);
        // TODO: Add the error to state
      } finally {
        setLoading(false);
      }
    }
    getChargerById(chargerId);
  }, [chargerId]);

  console.log("THIS IS CHARGER", charger);
  return (
    <>
      {loading ? (
        <CssLoader />
      ) : charger !== undefined ? (
        <div>
          <ChargerDetail key={charger.id} charger={charger} />
        </div>
      ) : (
        <div>
          <p>charger not found</p>
          <Link to="/chargers">Go back to the main page</Link>
        </div>
      )}
    </>
  );
};

export async function handleBooking(e) {}
