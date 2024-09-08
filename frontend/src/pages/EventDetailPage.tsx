import { Box } from "@mui/material";
import EventDetail from "../components/EventDetail";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <Box
      sx={{
        mt: 15,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      {id ? <EventDetail id={id} /> : <h3>Need Login to Show the Detail</h3>}
    </Box>
  );
}
