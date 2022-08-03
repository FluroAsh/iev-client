import { Charger } from "../components/Charger";
import { getChargers, getMyChargers } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const ViewChargers = () => {
  const { store, dispatch } = useGlobalState();
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
    fetchData(location, dispatch);
  }, [location]);

  return (
    <>
      {chargerList.length ? (
        <>
          <AnimatePresence>
            <motion.div
              className="chargers"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {chargerList.slice(0, 9).map((charger) => (
                <Charger key={charger.id} charger={charger} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <p>List of chargers is empty</p>
      )}
    </>
  );
};

async function fetchData(location, dispatch) {
  if (location.pathname === "/chargers") {
    try {
      const chargers = await getChargers();
      dispatch({
        type: "setChargerList",
        data: chargers,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  if (location.pathname === "/chargers/mychargers") {
    try {
      const myChargers = await getMyChargers();
      dispatch({
        type: "setChargerList",
        data: myChargers,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
}
