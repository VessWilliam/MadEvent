import { Box } from "@mui/material";
import EventDetail from "../components/EventDetail";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      {id ? <EventDetail id={id} /> : <h3>Event ID is not available</h3>}
    </Box>
  );
}
