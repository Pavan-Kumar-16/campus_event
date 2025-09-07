import express from "express";
import {
  eventPopularity,
  studentParticipation,
  topActiveStudents,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/popularity", eventPopularity);
router.get("/participation", studentParticipation);
router.get("/active-students", topActiveStudents);

export default router;
