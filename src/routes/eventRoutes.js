import express from "express";
import {
  listEvents,
  registerForEvent,
  submitFeedback,
  getEventReport,
} from "../controllers/eventController.js";
const router = express.Router();
router.get("/", listEvents);
router.post("/:id/register", registerForEvent);
router.post("/:id/feedback", submitFeedback);
router.get("/:id/report", getEventReport);

export default router;
