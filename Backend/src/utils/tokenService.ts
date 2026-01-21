import dotenv from "dotenv";
import jwt, {
  JwtPayload,
  SignOptions,
} from "jsonwebtoken";

import {
  TokenPayload,
  ResetTokenPayload,
  TokenOptions,
} from "@types";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const RESET_TOKEN_SECRET = process.env.RESET_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET || !RESET_TOKEN_SECRET) {
  throw new Error("JWT secrets are missing in environment variables");
}

const ACCESS_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m"),
};

const REFRESH_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d"),
};

const RESET_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: (process.env.RESET_TOKEN_EXPIRY || "10m"),
};

const handleJwtError = (
  error: unknown,
  tokenType = "token"
): never => {
  let err: Error & { code?: string; statusCode?: number };

  if (error instanceof jwt.TokenExpiredError) {
    err = new Error(`${tokenType} expired`);
    err.code = "TOKEN_EXPIRED";
    err.statusCode = 401;
    throw err;
  }

  if (error instanceof jwt.JsonWebTokenError) {
    err = new Error(`Invalid ${tokenType}`);
    err.code = "INVALID_TOKEN";
    err.statusCode = 401;
    throw err;
  }

  if (error instanceof jwt.NotBeforeError) {
    err = new Error(`${tokenType} not active yet`);
    err.code = "TOKEN_NOT_ACTIVE";
    err.statusCode = 401;
    throw err;
  }

  err = new Error("Token verification failed");
  err.code = "TOKEN_ERROR";
  err.statusCode = 401;
  throw err;
};

// ACCESS TOKEN
export const generateAccessToken = (
  user: TokenPayload
): string => {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_OPTIONS as SignOptions
  );
};

export const verifyAccessToken = (
  token: string
): TokenPayload => {
  try {
    return jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as TokenPayload;
  } catch (error) {
    return handleJwtError(error, "access token");
  }
};

// REFRESH TOKEN
export const generateRefreshToken = (
  user: TokenPayload
): string => {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_OPTIONS as SignOptions
  );
};

export const verifyRefreshToken = (
  token: string
): TokenPayload => {
  try {
    return jwt.verify(
      token,
      REFRESH_TOKEN_SECRET
    ) as TokenPayload
  } catch (error) {
    return handleJwtError(error, "refresh token");
  }
};

// RESET TOKEN
export const generateResetToken = (
  payload: ResetTokenPayload
): string => {
  return jwt.sign(
    payload,
    RESET_TOKEN_SECRET,
    RESET_TOKEN_OPTIONS as SignOptions
  );
};

export const verifyResetToken = (
  token: string
): ResetTokenPayload & JwtPayload => {
  try {
    return jwt.verify(
      token,
      RESET_TOKEN_SECRET
    ) as ResetTokenPayload & JwtPayload;
  } catch (error) {
    return handleJwtError(error, "reset token");
  }
};