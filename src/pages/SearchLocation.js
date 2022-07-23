import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocation } from '../services/searchServices';
import { ChargerCard } from '../components/ChargerCard';

export const SearchLocation = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState([]);
  const [error, setError] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /** Load initial data for charger locations */
  useEffect(() => {
    setChargers([]);
    const searchParams = new URLSearchParams(search);
    const location = searchParams.get('location');

    async function fetchChargers() {
      setLoading(true);
      try {
        const data = await searchLocation(location);
        setChargers(data);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    }
    fetchChargers();
  }, [search]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        /**
         * Card needs:
         * 1. Plug Name
         * 2. Charger Station Image
         * 3. Owner First Name (in bottom left of image)
         * 4. Charging Station Name
         * 5. Available Date
         * 6. Price (per date)
         */
        // -> Refactor to a reusable component later (the same in both home/search)
        // Just that the the home one will use a different set of charging stations (random set & limited to 10)
        <>
          {chargers.length > 0 ? (
            <>
              <section
                id="search-location"
                style={{ display: 'flex', background: '#aa55ee50' }}
              >
                <div
                  className="cards-container"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    variant="h5"
                    sx={{ px: 1, py: 2, width: '100%', textAlign: 'center' }}
                  >
                    {`${chargers.length} charger(s) found`}
                  </Typography>
                  <section
                    className="chargers"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {chargers.map((charger) => (
                      <>
                        <ChargerCard charger={charger} />
                        {/* BTW: Multiple cards just for testing purposes, will be changed to one card */}
                        <ChargerCard charger={charger} />
                        <ChargerCard charger={charger} />
                        <ChargerCard charger={charger} />
                        <ChargerCard charger={charger} />
                        <ChargerCard charger={charger} />
                      </>
                    ))}
                  </section>
                </div>
                {/* TODO: Add the Google Map component, which should be passed the location & render a relevant image (or nothing) */}
                {!isMobile && (
                  <div
                    className="google-map"
                    style={{
                      background: '#e0e0e0',
                    }}
                  >
                    Map Image placeholder
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="error-container">
              <h1>{error.message}</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};
