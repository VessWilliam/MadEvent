import apiClient from "../api/apiClient";
import { IEvent } from "../types/eventTypes";

export const deleteEventService = async (id: string) => {
  try {
    const response = await apiClient.delete(`/event/${id}`);
    if (response.status < 200 || response.status >= 300) {
      console.error(`Delete with status code ${response.status}`);
    }
  } catch (error: any) {
    console.error(`Error delete event: ${error.message}`);
  }
};

export const createEventsService = async (createEvent: IEvent) => {
  try {
    const response = await apiClient.post("/event/create", createEvent);

    if (response.status < 200 || response.status >= 300) {
      console.error(`Create with status code ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    console.error(`Error Create event: ${error.message}`);
  }
};

export const updateEventService = async (id: string, updatedata: IEvent) => {
  try {
    const response = await apiClient.put(`/event/${id}`, updatedata);
    if (response.status < 200 || response.status >= 300) {
      console.error(`Register with status code ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    console.error(`Error update event: ${error.message}`);
  }
};

export const getEventByIdService = async (id: string) => {
  try {
    const response = await apiClient.get(`/event/${id}`);
    if (response.status < 200 || response.status >= 300) {
      console.error(`Get by ID status code ${response.status}`);
      return null;
    }

    const event = response.data;

    event.startDate = event.startDate.split("T")[0];
    event.endDate = event.endDate.split("T")[0];

    return event;
  } catch (error: any) {
    console.error(`Error fetching event by ID: ${error.message}`);
    return null;
  }
};

export const getAllEventService = async () => {
  try {
    const response = await apiClient.get("/event/all");
    if (response.status < 200 || response.status >= 300) {
      console.error(`Get all with status code ${response.status}`);
    }

    const events = response.data.map((event: IEvent) => {
      const startDateStr =
        event.startDate instanceof Date
          ? event.startDate.toString()
          : event.startDate || "";
      const endDateStr =
        event.endDate instanceof Date
          ? event.endDate.toString()
          : event.endDate || "";

      const startDatePart = startDateStr.split("T")[0];
      const endDatePart = endDateStr.split("T")[0];
      return {
        ...event,
        startDate: startDatePart,
        endDate: endDatePart,
      };
    });

    return events;
  } catch (error: any) {
    console.error(`Error get all in: ${error.message}`);
  }
};
