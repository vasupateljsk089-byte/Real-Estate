export interface User {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    chatId: string[];
  }
  
export type StoredUser = Omit<User, "email">;  
  export interface AuthState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
  }
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }
  
  export interface SignupPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface SignupResponse {
    user: User;
    token: string;
  }
  
  export interface ForgotPasswordPayload {
    email: string;
  }
  
  export interface ForgotPasswordResponse {
    message: string;
  }
  
  export interface ResetPasswordPayload {
    token: string;
    password: string;
  }
  
  export interface ResetPasswordResponse {
    message: string;
  }
  
  /* =========================
     GENERIC API ERROR
  ========================= */
  export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
  }
  