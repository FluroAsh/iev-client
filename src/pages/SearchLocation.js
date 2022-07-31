import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { geocodeLocation, searchLocation } from "../services/searchServices";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { ErrorScreen } from "../components/ErrorScreen";
import { GoogleMap } from "../components/GoogleMap";
import { ViewChargers } from "./ViewChargers";

export const SearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { dispatch, store } = useGlobalState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [coordinates, setCoordinates] = useState({});
  const { location, chargerList } = store;

  /** Load initial data for charger locations */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryLocation = searchParams.get("location");

    populateSearch(
      queryLocation,
      setLoading,
      setCoordinates,
      setError,
      dispatch
    );
  }, [location]);

  return (
    <>
      {loading && <CssLoader />}
      {error && <ErrorScreen error={error} />}
      {chargerList && (
        <div className="search">
          <div className="search__cards">
            <Typography
              variant="h5"
              sx={{ px: 1, py: 2, width: "100%", textAlign: "center" }}
            >
              {/* TODO: Pluralize the string with an NPM package */}
              {`${chargerList.length} charger(s) found`}
            </Typography>
            <ViewChargers />
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
  setError,
  dispatch
) {
  try {
    setError(false); // clear previous errors
    setLoading(true);
    const chargers = await searchLocation(queryLocation || "");
    dispatch({
      type: "setChargerList",
      data: chargers,
    });
    const { lat, lng } = await geocodeLocation(chargers[0].Address.city);
    setCoordinates({ lat, lng });
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}
