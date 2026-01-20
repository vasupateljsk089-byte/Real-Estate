import bcrypt from "bcrypt";
import prisma from "@lib/prisma";
import { Request, Response } from "express";
import { RegisterPayload, LoginPayload, ForgotPasswordPayload, VerifyOtpPayload, ResetPasswordPayload, AccessTokenPayload, ApiResponse} from "@types";
import { MESSAGES } from "@constants/messages";

import {
  generateAccessToken,
  generateResetToken,
  verifyResetToken,
} from "@utils/tokenService.js";

import { sendMail } from "@utils/mailService.js";
import { otpTemplate } from "@utils/emailTemplates";

// Request<{}, {}, RegisterPayload>, => Request<Params, ResBody, ReqBody, Query>
export const register = async (
  req: Request<{}, {}, RegisterPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.EMAIL_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: MESSAGES.AUTH.REGISTER_FAILED,
    });
  }
};

export const login = async (
  req: Request<{}, {}, LoginPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.INVALID_CREDENTIALS,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.INVALID_CREDENTIALS,
      });
    }

    const payload: AccessTokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    const { password: _, ...userInfo } = user;

    return res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true, // enable in production
      })
      .status(200)
      .json({
        success: true,
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
        data: userInfo,
      });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: MESSAGES.AUTH.LOGIN_FAILED,
    });
  }
};

export const logout = (
  _req: Request,
  res: Response<ApiResponse>
): Response<ApiResponse> => {
  return res.clearCookie("token").status(200).json({
    success: true,
    message: MESSAGES.AUTH.LOGOUT_SUCCESS,
  });
};

export const forgotPassword = async (
  req: Request<{}, {}, ForgotPasswordPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 🔒 Do not reveal user existence
    if (!user) {
      return res.status(200).json({
        success: true,
        message: MESSAGES.AUTH.OTP_SENT_IF_EXISTS,
      });
    }

    const otp:string = Math.floor(100000 + Math.random() * 900000).toString();

    const resetToken = generateResetToken({ email, otp });

    await sendMail({
      to: email,
      subject: MESSAGES.EMAIL.RESET_PASSWORD_SUBJECT,
      html: otpTemplate(otp),
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.AUTH.OTP_SENT,
      data: { resetToken },
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: MESSAGES.AUTH.OTP_FAILED,
    });
  }
};

export const verifyOtp = async (
  req: Request<{}, {}, VerifyOtpPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const { otp, resetToken } = req.body;

    const decoded = verifyResetToken(resetToken);

    if (decoded.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.INVALID_OTP,
      });
    }

    return res.status(200).json({
      success: true,
      message: MESSAGES.AUTH.OTP_VERIFIED,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordPayload>,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
    const { newPassword, resetToken } = req.body;

    const decoded = verifyResetToken(resetToken);
    const { email } = decoded;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.COMMON.INVALID_REQUEST,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: MESSAGES.AUTH.PASSWORD_RESET_SUCCESS,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};
