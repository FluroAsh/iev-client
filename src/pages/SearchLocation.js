import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocation } from '../services/searchServices';
import { ChargerCard } from '../components/ChargerCard';
import { CssLoader } from '../components/CssLoader';

export const SearchLocation = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
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
        <CssLoader />
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
              >
                <div
                  className="cards-container"
                >
                  <Typography
                    variant="h3"
                    sx={{ px: 1, py: 2, width: '100%', textAlign: 'center' }}
                  >
                    {/* TODO: Pluralize the string with an NPM package */}
                    {`${chargers.length} charger(s) found`} 
                  </Typography>
                  <section
                    className="chargers"
                  >
                    {chargers.map((charger) => (
                        <ChargerCard charger={charger} />
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
              <Typography variant="h5">{error.message}</Typography>
            </div>
          )}
        </>
      )}
    </>
  );
};
