import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { apiConnector } from "@/api/axios";
import { useZodForm } from "@/hooks/useZodForm";
import { resetPasswordSchema } from "@/validation/auth.validation";
import type { ApiResponse } from "@/types/api.types";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const { values, errors, isValid, register } =
    useZodForm(resetPasswordSchema);

  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await apiConnector<ApiResponse>(
        "POST",
        "/auth/reset-password",
        {
          newPassword: values.password,
          resetToken: localStorage.getItem("resetToken"),
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      localStorage.removeItem("resetToken");

      toast.success(res.data.message || "Password reset successful");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Reset Password
        </h2>
        <p className="text-gray-500">
          Create a new secure password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleReset} className="space-y-6">
        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            New Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter new password"
              className={`w-full rounded-2xl pl-12 pr-12 py-4 text-sm outline-none border
                ${
                  errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Confirm Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={`w-full rounded-2xl pl-12 pr-12 py-4 text-sm outline-none border
                ${
                  errors.confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="
            w-full rounded-xl py-3 font-semibold text-lg transition
            bg-amber-400 hover:bg-amber-500
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:cursor-not-allowed
            disabled:hover:bg-gray-300
            shadow-lg
          "
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
