import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

export const Charger = ({ charger }) => {

    //TODO: handle price display
  const formatedPrice = `$${charger.price/100}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        // height="140"
        image={charger.imageUrl}
        alt={charger.name}
      />
      <CardContent>
        <Link to={`/charger/${charger.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h5">{Charger.name}</Typography>
        </Link>
        {/* <Link to={`/user/${message.username}`}> TODO: use username instead of id */}

        <Typography variant="p">
          Owner:{" "}
          <Link to={`/user/${charger.User.id}`}>{charger.User.username}</Link>{" "}
        </Typography>

        <Typography variant="p">{formatedPrice}</Typography>
        <Typography variant="p">
          {Object.values(charger.Address).join(" ")}
        </Typography>

        {/* <Typography variant='p'>{charger.instructions}</Typography> */}
      </CardContent>
    </Card>
  );
};
