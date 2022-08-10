import { Charger } from "../components/Charger";
import { getChargers, getMyChargers } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CssLoader } from "../components/CssLoader";
import { Link } from "react-router-dom";

export const ViewChargers = () => {
  const { store, dispatch } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const { location, chargerList } = store;

  // Framer motion animation definition objects
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
    fetchData(location.pathname, dispatch, setLoading);
  }, [location, dispatch]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {chargerList.length > 0 ? (
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
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            No chargers yet...
            <br />
            <Link to="/chargers/new">Click here to create one!</Link>
          </h2>
        </div>
      )}
    </>
  );
};

export async function fetchData(pathname, dispatch, setLoading) {
  // Handle fetching & setting all existing chargers to state
  if (pathname === "/chargers") {
    try {
      setLoading(true);
      const chargers = await getChargers();
      dispatch({
        type: "setChargerList",
        data: chargers,
      });
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
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
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
    } finally {
      setLoading(false);
    }
  }
}
