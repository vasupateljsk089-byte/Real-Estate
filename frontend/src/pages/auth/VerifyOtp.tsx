import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { verifyOtpSchema } from "@/validation/auth.validation";
import type { VerifyOtpForm } from "@/validation/auth.validation";
import { verifyOtp } from "@/services/auth.service";
import { Button } from "@/components/ui/Button";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const email: string | undefined = state?.email;

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<VerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onSubmit",
  });

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  /* ========================
     OTP Change
  ======================== */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otpValues];
    next[index] = value;
    setOtpValues(next);

    setValue("otp", next.join(""));

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* ========================
     Backspace Handling
  ======================== */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ========================
     Submit
  ======================== */
  const onSubmit = (data: VerifyOtpForm) => {
    verifyOtp(
      {
        email,
        otp: data.otp,
        resetToken: localStorage.getItem("resetToken"),
      },
      navigate
    )();
  };

  const isComplete = otpValues.every(Boolean);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-3 mb-8">
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                h-14 w-12 rounded-xl border border-gray-300 bg-gray-50
                text-center text-xl font-semibold
                focus:outline-none
                focus:ring-1 focus:ring-wooden
                transition
              "
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          type="submit"
          loading={isSubmitting}
          loadingText="Verifying..."
          disabled={!isComplete}
        >
          Verify & Continue
        </Button>
      </form>

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
