import bcrypt from "bcrypt";
import prisma from "@lib/prisma";
import { Request, Response } from "express";
import { RegisterPayload, LoginPayload, ForgotPasswordPayload, VerifyOtpPayload, ResetPasswordPayload, TokenPayload, ApiResponse} from "@types";
import { MESSAGES } from "@constants/messages";

import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetToken,
} from "@utils/tokenService.js";

import { sendMail } from "@utils/mailService.js";
import { otpTemplate } from "@utils/emailTemplates";


export const getMe = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    // console.log("refresh ",refreshToken)
    let payload: { userId: string } | null = null;

    //  Try access token first
    if (accessToken) {
      try {
        payload = verifyAccessToken(accessToken);
      } catch (err: any) {
        // Access token expired → allow refresh fallback
        if (err.code !== "TOKEN_EXPIRED") {
          return res.status(401).json({
            success: false,
            message: "Invalid access token",
            code: "INVALID_ACCESS_TOKEN",
          });
        }
      }
    }

    /**
       Fallback to refresh token
     */
    if (!payload) {
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Authentication required. Please login again.",
          code: "UNAUTHORIZED",
        });
      }

      let decoded: { userId: string; email: string };

      try {
        decoded = verifyRefreshToken(refreshToken);
      } catch {
        return res.status(401).json({
          success: false,
          message: "Session expired. Please login again.",
          code: "REFRESH_TOKEN_EXPIRED",
        });
      }

      payload = { userId: decoded.userId };

      /**
       * Issue NEW access token
       */
      const newAccessToken = generateAccessToken({
        userId: decoded.userId,
        email: decoded.email,
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
    }

    /**
     * STEP 3: Fetch user
     */
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        avtar: true,
        email: true,
        chatId: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
        code: "USER_NOT_FOUND",
      });
    }

    /**
     * SUCCESS
     */
    return res.status(200).json({
      success: true,
      message: "Session restored successfully",
      data: user,
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
      code: "AUTH_ERROR",
    });
  }
};


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
    console.log("req body",req.body)
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        avtar: true,
        chatId: true,
        password: true, // ONLY because we need to compare
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.INVALID_CREDENTIALS,
      });
    }

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // remove password before sending
    const { password: _, ...userInfo } = user;

    return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // or "lax" (see explanation)
      maxAge: 15 * 60 * 1000, // 15 minutes
    })  
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // path: "/api/auth/refresh",
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
  return res
  .clearCookie("accessToken")
  .clearCookie("refreshToken", { path: "/auth/refresh" })
  .status(200)
  .json({
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
      return res.status(400).json({
        success: false,
        message: MESSAGES.AUTH.OTP_SENT_IF_EXISTS,
      });
    }

    const otp:string = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated Otp",otp);

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


export const refreshTokens = async (
  req: Request,
  res: Response<ApiResponse>
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing. Please login again.",
        code: "REFRESH_TOKEN_MISSING",
      });
    }

    let decoded: { userId: string; email: string };

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
        code: "REFRESH_TOKEN_EXPIRED",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found for this session",
        code: "INVALID_REFRESH_TOKEN",
      });
    }

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });

  } catch {
    return res.status(401).json({
      success: false,
      message: "Unable to refresh session",
      code: "REFRESH_FAILED",
    });
  }
};
