import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { displayAUD } from "../utils/helpers";

export const Charger = ({ charger }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked!");
    navigate(`/charger/${charger.id}`);
  };

  return (
    <Card className="card">
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          image={charger.imageUrl}
          alt={charger.name}
        />
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {charger.name}
            </Typography>

            <Typography variant="h6" color="text.primary">
              {Object.values(charger.Address.city)}
            </Typography>

            <Typography variant="body1" color="text.primary">
              {displayAUD(charger.price)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          type="submit"
          value="active"
          variant="contained"
          onClick={handleClick}
          style={{ marginRight: "16px" }}
        >
          View
        </Button>
        {/* <ButtonGroup key={charger.id} charger={charger} /> */}
      </CardActions>
    </Card>
  );
};
