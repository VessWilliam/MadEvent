import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

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

          {!isLoggedIn ? (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          ) : (
            <Button onClick={handleLogoutClick} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
