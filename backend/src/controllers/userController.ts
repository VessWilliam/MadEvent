import { Request, Response } from "express";
import UserService from "../services/userService";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);

    if (typeof result === "string") {
      return res.status(401).json({ error: result });
    }

    res.status(200).json(result); // Use 200 for successful login
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);

    if (typeof result === "string") {
      return res.status(400).json({ error: result });
    }

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
