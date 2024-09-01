import apiClient from "../api/apiClient";
import { IUserCredentials, IUserRegistration } from "../types/usersTypes";

export const loginService = async (userLogin: IUserCredentials) => {
  try {
    const response = await apiClient.post("/users/login", userLogin);

    if (response.status < 200 || response.status >= 300) {
      console.error(`Login failed with status code ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    console.error(`Error logging in: ${error.message}`);
  }
};

export const registerService = async (createUser: IUserRegistration) => {
  try {
    const response = await apiClient.post("/users/register", createUser);
    console.log("hello" ,createUser)
    if (response.status < 200 || response.status >= 300) {
      console.error(`Register failed with status code ${response.status}`);
    }
    ;
    return response.data;
  } catch (error: any) {
    console.error(`Error register in: ${error.message}`);
  }
};
