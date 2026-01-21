import { z } from "zod";
// Email regex
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|\\:;"'<>,./~`]).{8,15}$/;

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Please enter a valid email address"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_ ]+$/,
      "Username can contain only le tters, numbers, underscore, and space"
    ),  

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be 8–15 characters and include uppercase, lowercase, number, and special character"
    )
});

export const loginSchema = z.object({
  email: z
  .string()
  .trim()
  .toLowerCase()
    .regex(emailRegex, "Please enter a valid email address"),
    
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z
  .string()
  .trim()
  .toLowerCase()
  .regex(emailRegex, "Please enter a valid email address"),
});

export const verifyOtpSchema = z.object({
  otp: z
  .string()
  .length(6, "Enter a valid 6-digit code")
  .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export const resetPasswordSchema = z
.object({
  password: z
  .string()
  .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordForm = z.infer<  typeof resetPasswordSchema>;
