import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useUsers } from "../../hooks/useUsers";
import { IUserRegistration } from "../../types/usersTypes";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserRegistration>();
  const { registerUser } = useUsers();

  const onSubmit = async (data: IUserRegistration) => {
    try {
      await registerUser(data);
    } catch (error: any) {
      console.error("register failed:", error.message);
    }
  };

  return (
    <Paper className="p-6 w-80 mx-auto" style={{ backgroundColor: "#C0C0C0" }}>
      <div className="flex justify-center mb-4">
        <Chip
          icon={<FaceIcon />}
          label="Register"
          color="warning"
          variant="outlined"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <TextField
          label="Name"
          variant="outlined"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          color="warning"
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          color="warning"
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel id="role-label" color="warning">
            Role
          </InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            defaultValue=""
            {...register("role", { required: "Role is required" })}
            error={!!errors.role}
            color="warning"
          >
            <MenuItem color="warning" value="admin">
              admin
            </MenuItem>
            <MenuItem color="warning" value="user">
              user
            </MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="warning">
          Register
        </Button>
      </form>
    </Paper>
  );
}
