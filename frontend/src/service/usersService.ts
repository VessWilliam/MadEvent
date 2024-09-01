import apiClient from "../api/apiClient";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/users/login", { email, password });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Login failed with status code ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

export const registerService = async (
  name: string,
  role: string,
  email: string,
  password: string
) => {
  try {
    const response = await apiClient.post("/users/register", {
      name,
      role,
      email,
      password,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Register failed with status code ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error signing in: ${error.message}`);
  }
};
