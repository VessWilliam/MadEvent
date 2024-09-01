import apiClient from "../api/apiClient";

interface IEvent {
  name: string;
  location: string;
  thumbnail: string;
  status: string;
}

export const updateEventService = async (id: string, updatedata: IEvent) => {
  try {
    const response = await apiClient.put(`/event/${id}`, updatedata);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Update failed with status code ${response.status}`);
    }
     
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};

export const getAllEventService = async () => {
  try {
    const response = await apiClient.get("/event/all");

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Login failed with status code ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};
