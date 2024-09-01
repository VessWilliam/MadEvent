import { useNavigate } from "react-router-dom";
import { loginService, registerService } from "../service/usersService";
import { IUserCredentials, IUserRegistration } from "../types/usersTypes";

export const useUsers = () => {
  const navigate = useNavigate();

  const login = async (userLogin: IUserCredentials) => {
    try {
      const result = await loginService(userLogin);
      localStorage.setItem("authToken", result.token);
      navigate("/");
      return result;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

  const registerUser = async (createUser: IUserRegistration) => {
    try {
      const result = await registerService(createUser);
      localStorage.setItem("authToken", result.token);
      navigate("/");
      return result;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

  return { login, registerUser };
};
