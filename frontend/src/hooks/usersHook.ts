import { useNavigate } from "react-router-dom";
import { loginService, registerService } from "../service/usersService";

export const usersHook = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const result = await loginService(email, password);
      localStorage.setItem("authToken", result.token);
      navigate("/");
      return result;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

  const registerUser = async (
    name: string,
    role: string,
    email: string,
    password: string
  ) => {
    try {
      const result = await registerService(name, role, email, password);

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
