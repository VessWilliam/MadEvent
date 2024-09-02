import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwtUtils";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;
  const role = token ? getRoleFromToken(token) : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Eve
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoggedIn && role === "admin" && (
              <Button
                component={Link}
                to="/dashboard"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
            )}
            {!isLoggedIn ? (
              <Button
                component={Link}
                to="/login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={handleLogoutClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
