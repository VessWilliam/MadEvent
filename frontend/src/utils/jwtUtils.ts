import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const getRoleFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
