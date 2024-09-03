import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEventGetByID } from "../hooks/useEvents";
import { Link } from "react-router-dom";

export default function EventDetail({ id }: { id: string }) {
  const { data: event, isLoading, error } = useEventGetByID(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error || !event) {
    return (
      <Typography variant="h3" sx={{ color: "yellow", mt: 3 }}>
        Need Login To View The Detail
      </Typography>
    );
  }

  return (
    <Card sx={{ width: 300, height: 450 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={event.thumbnail || "/static/images/default.jpg"}
        title={event.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {event.status}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          {event.startDate} - {event.endDate}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 1 }}>
        <Button component={Link} to="/" size="small">
          Back
        </Button>
      </CardActions>
    </Card>
  );
}
