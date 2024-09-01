import { useState, useEffect } from "react";
import {
  getAllEventService,
  updateEventService,
} from "../service/eventsService";
import { IEvent } from "../types/eventTypes";

const splitDate = (dateTimeString: string) => {
  const [date, time] = dateTimeString.split("T");
  return { date, time };
};

export const useEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEventService();
        const processedData = data.map((event: any) => ({
          ...event,
          startDate: splitDate(event.startDate).date,
          endDate: splitDate(event.endDate).date,
        }));
        setEvents(processedData);
      } catch (error: any) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);

  const updateEvent = async (id: string, updatedData: IEvent) => {
    try {
      await updateEventService(id, updatedData);
    } catch (error: any) {
      console.error("Failed to update event", error);
    }
  };

  return { events, updateEvent };
};
