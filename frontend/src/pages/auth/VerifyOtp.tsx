import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnector } from "@/api/axios";
import { verifyOtpSchema } from "@/validation/auth.validation";
import type { ApiResponse } from "@/types/api.types";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<HTMLInputElement[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  /* =========================
     Helpers
  ========================= */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* =========================
     Verify OTP
  ========================= */
  const handleVerify = async () => {
    const code = otp.join("");

    const parsed = verifyOtpSchema.safeParse({ otp: code });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    try {
      const res = await apiConnector<ApiResponse>(
        "POST",
        "/auth/verify-otp",
        {
          email,
          otp: code,
          resetToken: localStorage.getItem("resetToken"),
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success(res.data.message || "OTP verified");

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired code"
      );
    }
  };

  const isComplete = otp.every(Boolean);

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-2xl">
          🛡️
        </div>

        <h2 className="text-3xl font-bold mb-2">
          Verification Code
        </h2>

        <p className="text-gray-500">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-gray-900">
            {email}
          </span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputs.current[index] = el;
            }}
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="
              h-14 w-12 rounded-xl border border-gray-300 bg-gray-50
              text-center text-xl font-semibold
              focus:outline-none focus:ring-2 focus:ring-amber-400
              transition
            "
          />
        ))}
      </div>

      {/* Resend */}
      <div className="mb-8 text-center text-sm text-gray-500">
        Didn’t receive the code?{" "}
        <button
          type="button"
          className="font-semibold text-amber-600 hover:text-amber-700"
        >
          Resend
        </button>
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={!isComplete}
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
        Verify & Continue
      </button>

      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        className="mt-8 text-center text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition"
      >
        ← Go back
      </div>
    </>
  );
};

export default VerifyOtp;
