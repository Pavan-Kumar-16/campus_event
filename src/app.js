import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Campus Event API is running 🚀" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
