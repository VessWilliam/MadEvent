import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventsById,
  updateEvent,
} from "../controllers/eventController";

const router = Router();

router.put("/:id", updateEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEventsById);
router.post("/create", createEvent);

export default router;
