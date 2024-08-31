import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name require"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"]),
});

export const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().min(1, "Location is required"),
  thumbnail: z.string().optional(),
  status: z.enum(["Ongoing", "Completed"]),
});
