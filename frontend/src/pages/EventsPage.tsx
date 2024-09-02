import EventTable from "../components/tables/EventTable";
import Box from "@mui/material/Box";

export default function EventsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        minWidth: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <EventTable />
    </Box>
  );
}
