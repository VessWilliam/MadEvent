export interface IUserCredentials {
    email: string;
    password: string;
  }
  
  export interface IUserRegistration {
    name: string;
    role: string;
    email: string;
    password: string;
    confirmPassword?: string; 
  }