import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { displayAUD } from "../utils/helpers";

export const Charger = ({ charger }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked!");
    navigate(`/charger/${charger.id}`);
  };

  return (
    
    <Card sx={{ maxWidth: 300, margin: 5, display: 'inline-flex',alignItems: 'baseline', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          // height="140"
          image={charger.imageUrl}
          alt={charger.name}
        />
        <CardContent>
          <div className="flex-box">
            <Typography gutterBottom variant="h5" component="div">
              <Link
                to={`/charger/${charger.id}`}
                style={{ textDecoration: "none" }}
              >
                {charger.name}
              </Link>
            </Typography>
            <Typography variant="h6">{displayAUD(charger.price)}</Typography>
          </div>

          <Typography variant="h6">
            {Object.values(charger.Address.city)}
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
              style={{ fontSize: "16px" }}
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
