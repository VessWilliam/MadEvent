import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IEvent } from "../types/eventTypes";
import {
  getAllEventService,
  createEventsService,
  updateEventService,
  deleteEventService,
  getEventByIdService,
} from "../service/eventsService";
import { useNavigate } from "react-router-dom";

const queryKeys = {
  events: ["events"] as const,
  eventById: (id: string) => ["event", id] as const,
};

const handleError = (error: any, message: string) => {
  console.error(`${message}:`, error.message);
};

export const useGetAllEvents = () => {
  return useQuery<IEvent[]>({
    queryKey: queryKeys.events,
    queryFn: getAllEventService,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, IEvent>({
    mutationFn: createEventsService,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.events as any);
      navigate("/dashboard");
    },
    onError: (error) => handleError(error, "Failed to create event"),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; updatedData: IEvent }>({
    mutationFn: async ({ id, updatedData }) => {
      await updateEventService(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.events as any);
    },
    onError: (error) => handleError(error, "Failed to update event"),
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await deleteEventService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.events as any);
      navigate(0);
    },
    onError: (error) => handleError(error, "Failed to delete event"),
  });
};


export const useEventGetByID = (id: string) => {
  return useQuery({
    queryKey: queryKeys.eventById(id),
    queryFn: () => getEventByIdService(id),
    enabled: !!id, 
  });
}