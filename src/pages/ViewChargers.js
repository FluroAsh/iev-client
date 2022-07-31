import { Charger } from "../components/Charger";
import { useGlobalState } from "../context/stateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const ViewChargers = () => {
  const { store } = useGlobalState();
  const { chargerList } = store;

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
    hidden: { opacity: 0, x: "-20%" },
    show: { opacity: 1, x: "0%" },
  };

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
              {chargerList.map((charger) => (
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
