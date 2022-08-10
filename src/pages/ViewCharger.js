import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useGlobalState } from "../context/stateContext";

import { getCharger } from "../services/chargerServices";
import { ChargerDetail } from "../components/ChargerDetail";
import { CssLoader } from "../components/CssLoader";

export const ViewCharger = () => {
  const { chargerId } = useParams();
  const [charger, setCharger] = useState({});
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGlobalState();

  useEffect(() => {
    getChargerById(chargerId, setLoading, dispatch, setCharger);
  }, [chargerId, dispatch]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {Object.keys(charger).length !== 0 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ChargerDetail key={charger.id} charger={charger} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="alert-error">
          <h3>Charger not found</h3>
          <Link to="/chargers">Go back to the main page</Link>
        </div>
      )}
    </>
  );
};

export async function getChargerById(
  chargerId,
  setLoading,
  dispatch,
  setCharger
) {
  try {
    setLoading(true);
    const chargerDetails = await getCharger(chargerId);
    setCharger(chargerDetails);
  } catch (err) {
    dispatch({
      type: "setErrorMessage",
      data: err.message,
    });
  } finally {
    setLoading(false);
  }
}
