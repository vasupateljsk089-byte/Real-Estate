import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";

import { apiConnector } from "@/api/axios";
import { AUTH_ENDPOINTS } from "@/api/endpoints";

import { setLoading, setUser, logout } from "@/store/slices/auth.slice";
import type { AppDispatch } from "@/store";

import type {
  LoginPayload,
  SignupPayload,
  User,
} from "@/types/auth.types";

import type { ApiResponse } from "@/types/api.types";

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

      dispatch(setUser(res.data.data));
      toast.success(res.data.message || "Login successful 🎉");

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
      const res = await apiConnector<ApiResponse<User>>(
        "POST",
        AUTH_ENDPOINTS.REGISTER,
        userData
      );

      if (!res.data.success || !res.data.data) {
        throw new Error(res.data.message);
      }

      dispatch(setUser(res.data.data));
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
