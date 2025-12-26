import express from "express";
import cors from "cors";
import signRoute from "./routes/sign";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(signRoute);
app.use(express.static("uploads"));

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
