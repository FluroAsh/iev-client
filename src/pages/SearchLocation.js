import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocation } from '../services/searchServices';
import { ChargerCard } from '../components/ChargerCard';

export const SearchLocation = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [chargers, setChargers] = useState([]);

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
      <Container>
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
            <Typography variant="h3" sx={{ p: 5 }}>
              {`${chargers.length} chargers found` ||
                'No chargers found, try again'}
            </Typography>
            {chargers.map((charger) => (
              <ChargerCard charger={charger} />
            ))}
          </>
        )}
      </Container>
    </>
  );
};
