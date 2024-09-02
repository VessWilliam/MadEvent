import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginService, registerService } from "../service/usersService";
import { IUserCredentials, IUserRegistration } from "../types/usersTypes";

const handleError = (error: any, action: string) => {
  console.error(`${action} failed:`, error.message);
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userLogin: IUserCredentials) => {
      return await loginService(userLogin);
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      navigate("/");
    },
    onError: (error) => handleError(error, "Login"),
  });
};

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (createUser: IUserRegistration) => {
      return await registerService(createUser);
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      navigate("/");
    },
    onError: (error) => handleError(error, "Registration"),
  });
};
