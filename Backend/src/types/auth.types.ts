export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  otp: string;
  resetToken: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  resetToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface ResetTokenPayload {
  email: string;
  otp: string;
}

