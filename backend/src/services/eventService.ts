import EventModel, { IEvent } from "../models/eventModel";
import { validateSchema } from "../utils/validateSchema";
import { eventSchema } from "../validation/dbSchema";
import { EventResponse } from "../models/DTO/eventDTO";

class EventService {
  private mapEventResponse(event: IEvent): EventResponse {
    return {
      id: event._id as string,
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      thumbnail: event.thumbnail,
      status: event.status || "Ongoing",
    };
  }

  async getAllEvent(): Promise<EventResponse[] | string> {
    try {
      const events = await EventModel.find().lean();
      return events.map((event) => this.mapEventResponse(event));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return `Error getting events: ${errorMessage}`;
    }
  }

  async getEventById(id: string): Promise<EventResponse | string> {
    try {
      const event = await EventModel.findById(id).lean();

      if (!event) {
        return `Event not found`;
      }

      return this.mapEventResponse(event);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return `Error getting event by ID: ${errorMessage}`;
    }
  }

  async createEvent(eventData: IEvent): Promise<EventResponse | string> {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 3);

      const validateEvent = validateSchema(eventSchema, {
        ...eventData,
        startDate,
        endDate,
      });

      if (typeof validateEvent === "string") {
        return validateEvent;
      }

      const event = new EventModel(validateEvent);
      await event.save();

      return this.mapEventResponse(event);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return `Error creating event: ${errorMessage}`;
    }
  }

  async updateEvent(
    id: string,
    updateData: Partial<IEvent>
  ): Promise<EventResponse | string> {
    try {
      const event = await EventModel.findById(id).exec();

      if (!event) {
        return "Event not found";
      }

      Object.assign(event, updateData);
      await event.save();

      return this.mapEventResponse(event);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return `Error updating event: ${errorMessage}`;
    }
  }
}

export default new EventService();
