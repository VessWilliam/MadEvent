"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventsById = exports.getAllEvents = exports.createEvent = void 0;
const eventService_1 = __importDefault(require("../services/eventService"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield eventService_1.default.createEvent(req.body);
        if (typeof result === "string") {
            return res.status(404).json({ error: result });
        }
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventService_1.default.getAllEvent();
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllEvents = getAllEvents;
const getEventsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield eventService_1.default.getEventById(id);
        if (typeof event === "string") {
            return res.status(404).json({ message: event });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEventsById = getEventsById;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = yield eventService_1.default.updateEvent(id, updateData);
        if (typeof result === "string") {
            return res.status(404).json({ message: result });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield eventService_1.default.deleteEvent(id);
        if (result === "Event not found") {
            return res.status(404).json({ message: result });
        }
        return res.status(200).json({ message: result });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res
            .status(500)
            .json({ message: `Error deleting event: ${errorMessage}` });
    }
});
exports.deleteEvent = deleteEvent;
