
import Box from "@mui/material/Box";
import Gallery from "../components/Gallery";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <Gallery/>
    </Box>
  );
}
