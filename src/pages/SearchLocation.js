import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import pluralize from "pluralize";

import { geocodeLocation, searchLocation } from "../services/searchServices";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { GoogleMap } from "../components/GoogleMap";
import { ViewChargers } from "./ViewChargers";
import { AlertError } from "../components/AlertError";

export const SearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { dispatch, store } = useGlobalState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [coordinates, setCoordinates] = useState({});
  const { location, chargerList } = store;

  const styles = {
    errorAlert: {
      position: "absolute",
      width: "100%",
      zIndex: 999,
      borderRadius: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  };

  // Load initial data for charger locations
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loading) {
    return <CssLoader />;
  }

  return (
    <>
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
            {error && (
              <AlertError
                message={error.message}
                setError={setError}
                styles={styles}
              />
            )}
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
    const chargers = await searchLocation(queryLocation || "");
    dispatch({
      type: "setChargerList",
      data: chargers,
    });
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
