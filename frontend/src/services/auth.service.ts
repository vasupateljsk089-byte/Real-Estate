import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
// import {showToast} from "@/components/ui/AppToast";
import { apiConnector } from "@/api/axios";
import { AUTH_ENDPOINTS } from "@/api/endpoints";

import { setAuthLoading,setLoading, setUser, logout } from "@/store/slices/auth.slice";
import type {User} from '@/store/slices/auth.slice'
import type { AppDispatch } from "@/store";
import { storage } from "@/utils/storage";

import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  OtpPayload,
  ForgotPasswordResponse,
} from "@/types/auth.types";

import type { ApiResponse } from "@/types/api.types";

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAuthLoading(true));

    const { data } = await apiConnector<ApiResponse<User>>(
      "GET",
      AUTH_ENDPOINTS.ME
    );
    if(data.data)
    dispatch(setUser(data.data));
  } catch {
    dispatch(logout());
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const login =
  (data: LoginPayload, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector<ApiResponse<User>>(
        "POST",
        AUTH_ENDPOINTS.LOGIN,
        data
      );

      if (!res.data.success || !res.data.data) {
        throw new Error(res.data.message);
      }

      const user = res.data.data;

      // 1️ Update redux state with user mail and id 
      dispatch(setUser(res.data.data));

      // 2️ Save ONLY safe fields to localStorage
      const { id, ...safeUser } = user;
      storage.setUser(safeUser);

      toast.success(res.data.message || "Login successful 🎉");
      // showToast("success", res.data.message || "Login successful 🎉");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const registerUser =
  (userData: SignupPayload, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector<ApiResponse>(
        "POST",
        AUTH_ENDPOINTS.REGISTER,
        userData
      );

      console.log("response in reg:", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      // dispatch(setUser(res.data.data));
      toast.success(res.data.message || "Account created successfully 🎉");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logoutUser =
  (navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      await apiConnector<ApiResponse>(
        "POST",
        AUTH_ENDPOINTS.LOGOUT
      );

      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    } finally {
      dispatch(logout());
      navigate("/login");
    }
};

export const forgotPassword =
  (
    data: ForgotPasswordPayload,
    navigate: NavigateFunction
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector<
        ApiResponse<ForgotPasswordResponse>
      >(
        "POST",
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

       console.log("Token",res.data)
       
      // store resetToken ONLY if backend sends it
      if (res.data.data?.resetToken) {
        const token = res.data.data?.resetToken;
        storage.setOtpToken(token);
      }

      toast.success(
        res.data.message || "OTP sent successfully"
      );

      navigate("/verify-otp", {
        state: { email: data.email },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to send OTP"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const verifyOtp =
  (data: OtpPayload, navigate: NavigateFunction) =>
  async () => {
    try {
      const res = await apiConnector<ApiResponse>(
        "POST",
        AUTH_ENDPOINTS.VERIFY_OTP,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success(res.data.message || "OTP verified");

      navigate("/reset-password", {
        state: { email: data.email },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired OTP"
      );
    }
  };
  
  
  
  export const resetPassword =
  (
    data: ResetPasswordPayload,
    navigate: NavigateFunction
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector<ApiResponse>(
        "POST",
        AUTH_ENDPOINTS.RESET_PASSWORD,
        {
          newPassword: data.password,
          resetToken:data.token
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      storage.clearOtpoToken();

      toast.success(
        res.data.message || "Password reset successful"
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password"
      );
      navigate("/forgot-password")
    } finally {
      dispatch(setLoading(false));
    }
  };