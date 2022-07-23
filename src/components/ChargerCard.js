import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { displayAUD } from '../utils/helpers';

export const ChargerCard = ({ charger }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Clicked!');
    navigate(`/chargers/${charger.id}`);
  };

  return (
    <Card
      key={charger.id}
      className="card"
      style={{ color: 'white', background: '#00814095' }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="300"
          image={charger.imageUrl}
          alt="charger" // temp change later (based on file name or something)
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {charger.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {displayAUD(charger.price)}
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
          startIcon={
            <FontAwesomeIcon
              icon={faCalendarPlus}
              style={{ fontSize: '16px' }}
            />
          }
          onClick={handleClick}
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};
