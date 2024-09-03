import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtills";

const publicRoutes = ["/api/users/login", "/api/users/register","/api/event/all"];

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }
    const decoded = verifyToken(token);
    (res as any).user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
