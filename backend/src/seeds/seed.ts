import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";

dotenv.config();

async function seedUser() {
  try {
    const existingUser = await User.findOne({ email: "Superadmin@gmail.com" });

    if (!existingUser) {
      const hashedPassword = await hashPassword("password");
      const user = {
        name: "Superadmin",
        email: "Superadmin@gmail.com",
        password: hashedPassword,
        role: "admin",
      };

      await User.create(user);
      console.log("Admin user seeded.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error: any) {
    console.error("Error seeding user:", error.message);
  }
}

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("Connected to MongoDB");

    await seedUser();
  })
  .catch((error: any) => {
    console.error("MongoDB connection error", error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
