import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { geocodeLocation, searchLocation } from "../services/searchServices";
import { Charger } from "../components/Charger";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { ErrorScreen } from "../components/ErrorScreen";
import { GoogleMap } from "../components/GoogleMap";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const SearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState();
  const [error, setError] = useState();
  const [coordinates, setCoordinates] = useState({});
  const { store } = useGlobalState();
  const { location } = store;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /** Load initial data for charger locations */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryLocation = searchParams.get("location");

    populateSearch(
      queryLocation,
      setLoading,
      setCoordinates,
      setChargers,
      setError
    );
  }, [location]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: "-20%" },
    show: { opacity: 1, x: "0%" },
  };

  return (
    <>
      {loading && <CssLoader />}
      {error && <ErrorScreen error={error} />}
      {chargers && (
        <div className="search">
          <div className="search__cards">
            <Typography
              variant="h5"
              sx={{ px: 1, py: 2, width: "100%", textAlign: "center" }}
            >
              {/* TODO: Pluralize the string with an NPM package */}
              {`${chargers.length} charger(s) found`}
            </Typography>
            <AnimatePresence>
              <motion.section
                className="chargers"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {chargers.map((charger) => (
                  <Charger key={charger.id} charger={charger} item={item} />
                ))}
              </motion.section>
            </AnimatePresence>
          </div>
          {!isMobile && <GoogleMap coordinates={coordinates} />}
        </div>
      )}
    </>
  );
};

export async function populateSearch(
  queryLocation,
  setLoading,
  setCoordinates,
  setChargers,
  setError
) {
  try {
    setError(false); // clear previous errors
    setLoading(true);
    const chargers = await searchLocation(queryLocation || "");
    const { lat, lng } = await geocodeLocation(chargers[0].Address.city);
    setCoordinates({ lat, lng });
    setChargers(chargers);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
