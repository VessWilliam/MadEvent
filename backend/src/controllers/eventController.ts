import { Request, Response } from "express";
import EventService from "../services/eventService";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const result = await EventService.createEvent(req.body);
    if (typeof result === "string") {
      return res.status(404).json({ error: result });
    }
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEvents = async (_: Request, res: Response) => {
  try {
    const events = await EventService.getAllEvent();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await EventService.getEventById(id);

    if (typeof event === "string") {
      return res.status(404).json({ message: event });
    }

    res.status(200).json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await EventService.updateEvent(id, updateData);

    if (typeof result === "string") {
      return res.status(404).json({ message: result });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
