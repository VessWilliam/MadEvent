import Box from "@mui/material/Box";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <LoginForm />
    </Box>
  );
}
