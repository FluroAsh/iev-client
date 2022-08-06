import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

import { geocodeLocation, searchLocation } from "../services/searchServices";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { GoogleMap } from "../components/GoogleMap";
import { ViewChargers } from "./ViewChargers";
import { AlertError } from "../components/AlertError";
import pluralize from "pluralize";

export const SearchLocation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [coordinates, setCoordinates] = useState({}); // set coordinates for GoogleMap component
  const { dispatch, store } = useGlobalState();
  const { location, chargerList } = store;

  // Style definition override for AlertError
  const styles = {
    errorAlert: {
      zIndex: 999,
      borderRadius: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  };

  // Load initial data for charger locations & parse the query in URL
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
  }, [location, dispatch]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
      {/* Full width (100%) AlertError on mobile devices*/}
      {isMobile && error && (
        <AlertError message={error.message} setError={setError} />
      )}
      <div className="search">
        <div className="search__cards">
          <Typography variant="h5" sx={{ width: "100%", textAlign: "center" }}>
            {`${chargerList.length} ${pluralize(
              "Charger",
              chargerList.length
            )}`}
          </Typography>
          <ViewChargers />
        </div>

        {!isMobile && (
          <div
            className="search__map"
            style={{
              background: "#e0e0e0",
            }}
          >
            {/* Displays AlertError ontop of GoogleMap component (large screens) */}
            {error && (
              <AlertError
                message={error.message}
                setError={setError}
                styles={styles}
              />
            )}
            {/* Pass results of geocoding as a prop */}
            <GoogleMap coordinates={coordinates} />
          </div>
        )}
      </div>
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
    setLoading(true);
    setError(false); // clear previous search errors
    // If no queryLocation provided, pass an empty string (response will be all chargers)
    const chargers = await searchLocation(queryLocation || "");
    dispatch({
      type: "setChargerList",
      data: chargers,
    });
    // destructure lat/lng from API as a result of passing in the first chargers city
    const { lat, lng } = await geocodeLocation(chargers[0].Address.city);
    setCoordinates({ lat, lng });
  } catch (err) {
    setError(err);
    dispatch({
      type: "setChargerList",
      data: [],
    });
    setCoordinates({ lat: 0, lng: 0 });
  } finally {
    setLoading(false);
  }
}
