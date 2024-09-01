import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Chip } from "@mui/material";
import { useAuth } from "../../hooks/usersHook";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Paper className="p-6 w-80 mx-auto" style={{ backgroundColor: "#C0C0C0" }}>
      <div className="flex justify-center mb-4">
        <Chip
          icon={<LockIcon />}
          label="Login"
          color="warning"
          variant="outlined"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
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
        <Button type="submit" variant="contained" color="warning">
          Login
        </Button>
      </form>
      <div className="flex justify-center mt-1">
        <Button component={Link} to="/register" color="warning">
          Signup here
        </Button>
      </div>
    </Paper>
  );
}
