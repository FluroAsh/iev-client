import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

export const ChargerCard = ({ charger }) => {
  const handleClick = (e) => {
    console.log('Clicked!');
    // navigate to /chargers/:id ...
  };

  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 350,
        maxHeight: '100%',
        m: 2,
        flexGrow: 1,
        flexShrink: 1,
      }}
      backgroundColor="secondary"
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="300"
          image={charger.imageUrl}
          alt="charger" // temp change later (based on file name or something)
          // style={{ backgroundSize: '100% 100%' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {charger.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {charger.instructions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faCalendarPlus} size="xs" />}
          onClick={handleClick}
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};
