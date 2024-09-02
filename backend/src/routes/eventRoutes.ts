import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventsById,
  updateEvent,
} from "../controllers/eventController";

const router = Router();

router.put("/:id", updateEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEventsById);
router.post("/create", createEvent);
router.delete("/:id", deleteEvent);

export default router;
