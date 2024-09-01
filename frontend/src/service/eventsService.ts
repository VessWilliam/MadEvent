import apiClient from "../api/apiClient";

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
  