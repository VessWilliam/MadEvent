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
        sx={{
          padding: 2,
          maxWidth: 400,
          margin: "20px auto",
          backgroundColor: "inherit",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Chip
            icon={<EventIcon />}
            label="Events"
            color="warning"
            variant="outlined"
            sx={{
              mb: 2,
              margin: "10px",
            }}
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
                sx={{ mb: 2 }} 
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
                sx={{ mb: 2 }} 
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
                sx={{ mb: 2 }} 
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
                sx={{ mb: 2 }} 
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
                sx={{ mb: 2 }} 
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
                sx={{ mb: 2 }} 
              />
            )}
          />

          <Container
            sx={{
              display: "flex",
              justifyContent: "center", 
            }}
          >
            <Button type="submit" variant="contained" color="warning" fullWidth>
              Create Event
            </Button>
          </Container>
        </form>
      </Paper>
    </Container>
  );
}
