import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { displayAUD } from "../utils/helpers";

const types = {
  typeOne: "Mennekes",
  typeTwo: "CCS",
  typeThree: "CHAdeMO",
};

export const Charger = ({ charger, item }) => {
  const navigate = useNavigate();

  const handleClickView = () => {
    navigate(`/charger/${charger.id}`);
  };

  return (
    <Card className="card" component={motion.div} variants={item}>
      <CardActionArea onClick={handleClickView}>
        <div className="card__img-plug">
          <CardMedia
            component="img"
            image={charger.imageUrl}
            alt={charger.name}
            style={{ height: "400px" }}
          />
          <div className="card__plug-pill">
            <span>{types[charger.Plug.plugName]}</span>
          </div>
        </div>

        <CardContent>
          <div>
            <Typography gutterBottom variant="h5">
              {charger.name}
            </Typography>

            <Typography variant="h6" color="text.primary">
              {charger.Address.city}
            </Typography>

            <Typography variant="body1" color="text.primary">
              {displayAUD(charger.price)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          value="active"
          variant="contained"
          onClick={handleClickView}
          style={{ marginRight: "16px" }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};
