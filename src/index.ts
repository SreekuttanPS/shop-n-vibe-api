import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import mainRoute from "./routes/main.routes";
import userRoutes from "./routes/api/user.routes";
import productRoutes from "./routes/api/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(dbUri || "")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes.
app.use("/", mainRoute);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("🔥 Start vibin bruh!");
});
