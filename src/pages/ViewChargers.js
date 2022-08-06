import { Charger } from "../components/Charger";
import { getChargers, getMyChargers } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertError } from "../components/AlertError";
import { CssLoader } from "../components/CssLoader";

export const ViewChargers = () => {
  const { store, dispatch } = useGlobalState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { location, chargerList } = store;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    fetchData(location.pathname, dispatch, setError, setLoading);
  }, [location, dispatch]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {error && <AlertError message={error.message} setError={setError} />}
      {chargerList.length > 0 && (
        <>
          <AnimatePresence>
            <motion.div
              className="chargers"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {chargerList.map((charger) => (
                <Charger key={charger.id} charger={charger} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export async function fetchData(pathname, dispatch, setError, setLoading) {
  if (pathname === "/chargers") {
    try {
      setLoading(true);
      const chargers = await getChargers();
      dispatch({
        type: "setChargerList",
        data: chargers,
      });
    } catch (err) {
      console.log("message", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  if (pathname === "/chargers/mychargers") {
    try {
      setLoading(true);
      const myChargers = await getMyChargers();
      dispatch({
        type: "setChargerList",
        data: myChargers,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
}
