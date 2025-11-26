import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectDB() {
  try {
    if (!env.mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
