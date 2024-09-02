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
const eventModel_1 = __importDefault(require("../models/eventModel"));
const validateSchema_1 = require("../utils/validateSchema");
const dbSchema_1 = require("../validation/dbSchema");
class EventService {
    mapEventResponse(event) {
        return {
            id: event._id,
            name: event.name,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            thumbnail: event.thumbnail,
            status: event.status || "Ongoing",
        };
    }
    getAllEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield eventModel_1.default.find().lean();
                return events.map((event) => this.mapEventResponse(event));
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                return `Error getting events: ${errorMessage}`;
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventModel_1.default.findById(id).lean();
                if (!event) {
                    return `Event not found`;
                }
                return this.mapEventResponse(event);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                return `Error getting event by ID: ${errorMessage}`;
            }
        });
    }
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = eventData.startDate
                    ? new Date(eventData.startDate)
                    : new Date();
                const endDate = eventData.endDate
                    ? new Date(eventData.endDate)
                    : new Date();
                if (!eventData.endDate) {
                    endDate.setDate(startDate.getDate() + 3);
                }
                const validateEvent = (0, validateSchema_1.validateSchema)(dbSchema_1.eventSchema, Object.assign(Object.assign({}, eventData), { startDate,
                    endDate }));
                if (typeof validateEvent === "string") {
                    return validateEvent;
                }
                const event = new eventModel_1.default(validateEvent);
                yield event.save();
                return this.mapEventResponse(event);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                return `Error creating event: ${errorMessage}`;
            }
        });
    }
    updateEvent(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventModel_1.default.findById(id).exec();
                if (!event) {
                    return "Event not found";
                }
                Object.assign(event, updateData);
                yield event.save();
                return this.mapEventResponse(event);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                return `Error updating event: ${errorMessage}`;
            }
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventModel_1.default.findById(id).exec();
                if (!event) {
                    return "Event not found";
                }
                yield event.deleteOne();
                return "Event successfully deleted";
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                return `Error deleting event: ${errorMessage}`;
            }
        });
    }
}
exports.default = new EventService();
