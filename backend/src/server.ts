import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs"; 
import path from "path";
import signRoute from "./routes/sign";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(signRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});