
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function HomePage() {
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
      <Typography
        variant="h3"
        align="center"
        sx={{ color: "slategray" }}
      >
        Event Manage App
      </Typography>
    </Box>
  );
}
