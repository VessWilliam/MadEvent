import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (
  userId: string,
  role?: string, 
  additionalClaims?: object
): string => {
  const payload = { userId, role, ...additionalClaims }; 
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (
  token: string
): JwtPayload | { error: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error: any) {
    switch (error.name) {
      case "TokenExpiredError":
        return { error: "Token expired" };
      case "JsonWebTokenError":
        return { error: "Invalid token" };
      default:
        return { error: "Token verification failed" };
    }
  }
};
