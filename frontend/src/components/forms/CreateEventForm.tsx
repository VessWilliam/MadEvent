import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  MenuItem,
  Chip,
  Container,
} from "@mui/material";
import { IEvent } from "../../types/eventTypes";
import EventIcon from "@mui/icons-material/Event";
import { useEvents } from "../../hooks/useEvents";

export default function CreateEventForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEvent>();
  const { createEvent } = useEvents();

  const onSubmit = async (data: IEvent) => {
    try {
      await createEvent(data);
    } catch (error: any) {
      console.error("Create failed:", error.message);
    }
  };

  return (
    <Container>
      <Paper
        className="p-6 w-80 mx-auto mt-10"
        style={{ backgroundColor: "#C0C0C0", padding: "20px" }}
      >
        <div className="flex justify-center mb-4">
          <Chip
            icon={<EventIcon />}
            label="Events"
            color="warning"
            variant="outlined"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Event name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Event Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                variant="outlined"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />

          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                variant="outlined"
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{ required: "End Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                variant="outlined"
                fullWidth
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue=""
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                variant="outlined"
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="thumbnail"
            control={control}
            defaultValue=""
            rules={{ required: "Thumbnail URL is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Thumbnail URL"
                variant="outlined"
                fullWidth
                error={!!errors.thumbnail}
                helperText={errors.thumbnail?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="warning" fullWidth>
            Create Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
