import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

export const Charger = ({ charger }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        // height="140"
        image={charger.imageUrl}
        alt={charger.name}
      />
      <CardContent>
        <Link to={`/chargers/${charger.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h5">{Charger.name}</Typography>
        </Link>
        {/* <Link to={`/user/${message.username}`}> TODO: use username instead of id */}
        <Link to={`/user/${charger.User.id}`}>
          <Typography variant="p">Host: {charger.User.username}</Typography>
        </Link>
        <Typography variant="p">{charger.price}</Typography>

        {/* <Typography variant='p'>{charger.instructions}</Typography> */}
      </CardContent>
    </Card>
  );
};
