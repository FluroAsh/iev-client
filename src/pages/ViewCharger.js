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
    getChargerById(chargerId, setLoading).then((data) => {
      console.log("THIS IS DATA", data);
      setChargerDetail(data);
    });
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

async function getChargerById(chargerId, setLoading) {
  try {
    setLoading(true);
    const chargerDetails = await getCharger(chargerId);
    return chargerDetails;
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
}

export async function handleBooking(e) {}
