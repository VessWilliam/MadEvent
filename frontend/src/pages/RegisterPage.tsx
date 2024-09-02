import Box from "@mui/material/Box";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage() {
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
      <RegisterForm />
    </Box>
  );
}
