import { React, useEffect, useState, useRef } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
// import { useLocation } from "react-router-dom";
import { searchLocation } from "../services/searchServices";
import { Charger } from "../components/Charger";
import { CssLoader } from "../components/CssLoader";
import { useGlobalState } from "../context/stateContext";

export const SearchLocation = () => {
  // const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState([]);
  const [error, setError] = useState({});

  const [width, setWidth] = useState(640); // Change this later
  const [height, setHeight] = useState(640); // Change this later, try to fix resize function
  const mapRef = useRef();

  const { store } = useGlobalState();
  const { location } = store;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // TODO: Handle no chargers found for particular location
  /** Load initial data for charger locations */
  useEffect(() => {
    console.log("Location", location);
    const searchParams = new URLSearchParams(location.search);
    console.log("Search Params", searchParams);
    const queryLocation = searchParams.get("location");

    async function fetchChargers() {
      setChargers([]);
      setError();
      setLoading(true);
      try {
        const data = await searchLocation(queryLocation || "");
        setChargers(data);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    }
    fetchChargers();
  }, [location]);

  // const getMapSize = () => {
  //   if (!isMobile) {
  //     setWidth(mapRef.current.clientWidth);
  //     setHeight(mapRef.current.clientHeight);
  //     console.log('resized');
  //   }
  // };

  // useEffect(() => {
  //   let lastMove = 0;
  //   window.addEventListener('resize', function() {
  //     if (Date.now() - lastMove > 2) {
  //       lastMove = Date.now();
  //       getMapSize();
  //     }
  //   }); // adds event listener and causes remounts
  //   // getMapSize(); // runs once
  // }, []);

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
          {chargers.length > 0 && (
            <>
              <section id="search-location">
                <div className="cards-container">
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
                    // ref={mapRef}
                    className="google-map"
                    style={{
                      background: "#e0e0e0",
                    }}
                  >
                    <img
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${chargers[0].Address.city}
          &zoom=13&size=${height}x${width}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                      alt="google maps location"
                    />
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
