import { Container } from '@mui/system';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocation } from '../services/searchServices';
import { ChargerCard } from '../components/ChargerCard';

export const SearchLocation = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /** Load initial data for charger locations */
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const location = searchParams.get('location');

    async function fetchChargers() {
      setLoading(true);
      const data = await searchLocation(location);
      setChargers(data);
      console.log(data);
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
          {chargers ? (
            <>
              <section style={{ display: 'flex' }}>
                <Container
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="h5" sx={{ p: 5, width: '100%' }}>
                    {chargers
                      ? `${chargers.length} chargers found`
                      : 'Nothing to see here'}
                  </Typography>
                  {chargers.map((charger) => (
                    <>
                      <ChargerCard charger={charger} />
                      <ChargerCard charger={charger} />
                      <ChargerCard charger={charger} />
                      <ChargerCard charger={charger} />
                      <ChargerCard charger={charger} />
                      <ChargerCard charger={charger} />
                    </>
                  ))}
                </Container>
                {!isMobile && (
                  <div
                    className="google-map"
                    style={{
                      backgroundColor: '#e0e0e0',
                      width: '50vw',
                      height: '100vh',
                      positon: 'sticky',
                    }}
                  >
                    Map Image placeholder
                  </div>
                )}
              </section>
            </>
          ) : (
            <h1>Nothing to see here</h1>
          )}
        </>
      )}
    </>
  );
};
