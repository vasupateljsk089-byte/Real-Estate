import type { NavigateFunction } from "react-router-dom";
import { toast } from "react-hot-toast";

import { apiConnector } from "@/api/axios";
import { USER_ENDPOINTS } from "@/api/endpoints";
import { setLoading, setUser, type User } from "@/store/slices/auth.slice";
import type { AppDispatch } from "@/store/index";
import type { ApiResponse } from "@/types/api.types";
import { storage } from "@/utils/storage";

export const updateUserProfile =
  (formData: FormData, navigate?: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector<ApiResponse<User>>(
        "PATCH",
        USER_ENDPOINTS.UPDATE_PROFILE,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      
      console.log("Update Profile Response:", res);
      if (!res.data.success || !res.data.data) {
        throw new Error(res.data.message || "Invalid response");
      }
      storage.setUser(res.data.data);  
      dispatch(setUser(res.data.data));

      toast.success(res.data.message || "Profile updated successfully");

      if (navigate) {
        navigate("/profile");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
