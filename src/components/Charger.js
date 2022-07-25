import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "./ButtonGroup";
import { displayAUD } from "../utils/helpers";

export const Charger = ({ charger }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked!");
    navigate(`/charger/${charger.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        display: "inline-flex",
        alignItems: "baseline",
        flexDirection: "column",
        background: "#00814095",
        color: "#fff",
      }}
      className="card"
    >
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
              {charger.name}
            </Typography>

            <Typography variant="h6" color="text.secondary">
              {Object.values(charger.Address.city)}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {displayAUD(charger.price)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup key={charger.id} charger={charger} />
      </CardActions>
    </Card>
  );
};
