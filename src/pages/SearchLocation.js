import { Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocation } from '../services/searchServices';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

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

  const handleClick = (e) => {
    console.log('Clicked!');
  };

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
              // <div
              //   style={{
              //     background: 'aqua',
              //     borderRadius: '15px',
              //     minWidth: '250px',
              //     maxWidth: '300px',
              //     padding: '15px',
              //   }}
              // >
              //   <h1>{charger.name}</h1>
              //   <img src={charger.imageUrl} alt="" />
              //   <br />
              //   <span>{charger.Host.firstName}</span>
              // </div>
              <Card sx={{ maxWidth: 345 }} backgroundColor="secondary">
                <CardActionArea onClick={handleClick}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={charger.imageUrl}
                    alt="charger" // temp change later (based on file name or something)
                    // style={{ backgroundSize: '100% 100%' }}
                    objectFit={false}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex' }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={
                      <FontAwesomeIcon icon={faCalendarPlus} size="xs" />
                    }
                    onClick={handleClick}
                  >
                    Book
                  </Button>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </Container>
    </>
  );
};
