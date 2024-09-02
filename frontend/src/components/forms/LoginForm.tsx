import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Chip, Box, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useUsers";
import { IUserCredentials } from "../../types/usersTypes";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();
  const { mutate: login } = useLogin();

  const onSubmit = async (data: IUserCredentials) => {
    try {
      await login(data);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Paper
      sx={{
        padding: 3,
        width: 320,
        margin: "20px auto",
        backgroundColor: "inherit",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Chip
          icon={<LockIcon />}
          label="Login"
          color="warning"
          variant="outlined"
        />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            color="warning"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            color="warning"
          />

          <Button type="submit" variant="contained" color="warning" fullWidth>
            Login
          </Button>
        </Box>
      </form>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
        <Button component={Link} to="/register" color="warning">
          Signup here
        </Button>
      </Box>
    </Paper>
  );
}
