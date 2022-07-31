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
import { displayAUD } from "../utils/helpers";
import { motion } from "framer-motion";

export const Charger = ({ charger, item }) => {
  const navigate = useNavigate();

  const handleClickView = () => {
    navigate(`/charger/${charger.id}`);
  };

  return (
    <Card className="card" component={motion.div} variants={item}>
      <CardActionArea onClick={handleClickView}>
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
          value="active"
          variant="contained"
          onClick={handleClickView}
          style={{ marginRight: "16px" }}
        >
          View
        </Button>
        {/* <ButtonGroup key={charger.id} charger={charger} /> */}
      </CardActions>
    </Card>
  );
};
