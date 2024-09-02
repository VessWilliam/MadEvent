import { useState, useEffect } from "react";
import {
  createEventsService,
  deleteEventService,
  getAllEventService,
  updateEventService,
} from "../service/eventsService";
import { IEvent } from "../types/eventTypes";
import { useNavigate } from "react-router-dom";

const splitDate = (dateTimeString: string) => {
  const [date, time] = dateTimeString.split("T");
  return { date, time };
};

export const useEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const navigate = useNavigate();

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

  const createEvent = async (createData: IEvent) => {
    try {
      const result = await createEventsService(createData);
      if (result) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Failed to update event", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteEventService(id);
      navigate(0);
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return { events, updateEvent, createEvent, deleteEvent };
};
