import express, { Response, Request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import { auth } from "./middleware/authMiddle";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(auth);
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);
app.use("/api/event", eventRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));
