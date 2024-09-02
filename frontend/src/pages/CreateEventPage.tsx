import Box from "@mui/material/Box";
import CreateEventForm from "../components/forms/CreateEventForm";

export default function CreateEventPage() {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <CreateEventForm />
    </Box>
  );
}
