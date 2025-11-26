import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "change-me",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/expense_db",
};
