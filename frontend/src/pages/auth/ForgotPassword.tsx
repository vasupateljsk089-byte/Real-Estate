import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { apiConnector } from "@/api/axios";
import { forgotPasswordSchema } from "@/validation/auth.validation";
import { useZodForm } from "@/hooks/useZodForm";
import type { ApiResponse } from "@/types/api.types";

const ForgotPassword = () => {
  const { values, errors, isValid, register } =
    useZodForm(forgotPasswordSchema);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await apiConnector<ApiResponse<{ resetToken?: string }>>(
        "POST",
        "/auth/forgot-password",
        values
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      // store token only if backend sends it (optional)
      if (res.data.data?.resetToken) {
        localStorage.setItem(
          "resetToken",
          res.data.data.resetToken
        );
      }

      toast.success(res.data.message || "OTP sent successfully");

      navigate("/verify-otp", {
        state: { email: values.email },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to send OTP"
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
          Forgot Password
        </h2>
        <p className="text-gray-500">
          We’ll send a verification code to your email
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSendOtp} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-3">
            Email Address
          </label>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-2xl pl-12 pr-4 py-4 text-sm outline-none border
                ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
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
          "
        >
          {loading ? "Sending..." : "Send verification code"}
        </button>
      </form>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
