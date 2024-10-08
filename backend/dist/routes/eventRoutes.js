"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
router.put("/:id", eventController_1.updateEvent);
router.get("/all", eventController_1.getAllEvents);
router.get("/:id", eventController_1.getEventsById);
router.post("/create", eventController_1.createEvent);
router.delete("/:id", eventController_1.deleteEvent);
exports.default = router;
