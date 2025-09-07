import express from "express";
import { checkIn } from "../controllers/attendanceController.js";

const router = express.Router();

// Check-in at Event
router.post("/checkin", checkIn);

export default router;
