export interface User {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    chatId: string[];
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
    username: string;
    email: string;
    password: string;
  }
  
  export interface ForgotPasswordPayload {
    email: string;
  }

  export interface OtpPayload {
    email: string;
    otp: string;
    resetToken?: string | null;
  }
  
  
  export interface ForgotPasswordResponse {
     resetToken:string;
  }
  
  export interface ResetPasswordPayload {
    token: string | null;
    password: string;
  }
   
  export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
  }
  