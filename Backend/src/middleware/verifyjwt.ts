import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@lib/prisma";

import { ApiResponse } from "@types";
import { MESSAGES } from "@constants/messages";

export const authenticateUser = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<Response<ApiResponse> | void> => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.AUTH.AUTH_REQUIRED,
      code: "AUTH_REQUIRED",
    });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret not configured");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.AUTH.USER_NOT_FOUND,
        code: "USER_NOT_FOUND",
      });
    }

    // attach to request (typed via declaration merging)
    req.userId = user.id;

    next();
  } catch (error: any) {

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.AUTH.SESSION_EXPIRED,
        code: "ACCESS_TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: MESSAGES.AUTH.INVALID_TOKEN,
      code: "INVALID_ACCESS_TOKEN",
    });
  }
};
