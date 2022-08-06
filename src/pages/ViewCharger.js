import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCharger } from "../services/chargerServices";
import { ChargerDetail } from "../components/ChargerDetail";
import { CssLoader } from "../components/CssLoader";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { AlertError } from "../components/AlertError";

export const ViewCharger = () => {
  const { chargerId } = useParams();
  const [charger, setCharger] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getChargerById(chargerId, setLoading, setError).then((data) => {
      setCharger(data);
    });
  }, [chargerId]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {error && <AlertError message={error.message} setError={setError} />}
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
          <p>Charger not found</p>
          <Link to="/chargers">Go back to the main page</Link>
        </div>
      )}
    </>
  );
};

async function getChargerById(chargerId, setLoading, setError) {
  try {
    setLoading(true);
    const chargerDetails = await getCharger(chargerId);
    return chargerDetails;
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
