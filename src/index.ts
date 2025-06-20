import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import mainRoute from "./routes/main.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(dbUri || "")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log("🔥 Start vibin bruh!");
});
