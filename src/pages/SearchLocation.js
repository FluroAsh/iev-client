import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { geocodeLocation, searchLocation } from "../services/searchServices";
import { Charger } from "../components/Charger";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { ErrorScreen } from "../components/ErrorScreen";
import { GoogleMap } from "../components/GoogleMap";

export const SearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState([]);
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

  return (
    <>
      {error && <ErrorScreen error={error} />}
      {loading ? (
        <CssLoader />
      ) : (
        <>
          {chargers.length && (
            <>
              <div className="search">
                <div className="search__cards">
                  <Typography
                    variant="h3"
                    sx={{ px: 1, py: 2, width: "100%", textAlign: "center" }}
                  >
                    {/* TODO: Pluralize the string with an NPM package */}
                    {`${chargers.length} charger(s) found`}
                  </Typography>
                  <section
                    className="chargers"
                  >
                    {chargers.map((charger) => (
                      <Charger key={charger.id} charger={charger} />
                    ))}
                  </section>
                </div>
                {!isMobile && <GoogleMap coordinates={coordinates} />}
              </div>
            </>
          )}
        </>
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
