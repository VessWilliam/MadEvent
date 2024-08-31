export interface LoginResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
}

export interface UserCreationResponse {
  user: UserResponse;
  token: string;
}
