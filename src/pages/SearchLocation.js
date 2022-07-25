import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { geocodeLocation, searchLocation } from "../services/searchServices";
import { Charger } from "../components/Charger";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export const SearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState([]);
  const [error, setError] = useState();
  const [coordinates, setCoordinates] = useState({});
  const { store } = useGlobalState();
  const { location } = store;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // defines styles for the map container
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // coordinates to center the map on
  const center = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  const mapOptions = {
    disableDefaultUI: true,
    streetViewControl: true,
  };

  /** Load initial data for charger locations */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryLocation = searchParams.get("location");

    async function fetchChargers() {
      setChargers([]);
      setError();
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
    fetchChargers();
  }, [location]);

  return (
    <>
      {error && (
        <div className="error-container">
          <Typography variant="h5">{error.message}</Typography>
        </div>
      )}
      {loading ? (
        <CssLoader />
      ) : (
        <>
          {chargers.length && (
            <>
              <section className="search">
                <div className="search__cards">
                  <Typography
                    variant="h3"
                    sx={{ px: 1, py: 2, width: "100%", textAlign: "center" }}
                  >
                    {/* TODO: Pluralize the string with an NPM package */}
                    {`${chargers.length} charger(s) found`}
                  </Typography>
                  <section className="chargers">
                    {chargers.map((charger) => (
                      <Charger key={charger.id} charger={charger} />
                    ))}
                  </section>
                </div>
                {!isMobile && (
                  <div
                    className="search__map"
                    style={{
                      background: "#e0e0e0",
                    }}
                  >
                    <LoadScript
                      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    >
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        options={mapOptions}
                      ></GoogleMap>
                    </LoadScript>
                  </div>
                )}
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};
