import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      setError("Enter complete 6-digit code");
      return;
    }

    try {
      await apiConnector.post("/auth/verify-otp", {
        email,
        otp: code,
        resetToken: localStorage.getItem("resetToken"),
      });

      navigate("/reset-password", { state: { email } });
    } catch {
      setError("Invalid or expired code");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/20 text-brand text-2xl">
          🛡️
        </div>

        <h2 className="font-heading text-3xl font-bold text-heading mb-2">
          Verification Code
        </h2>

        <p className="text-body text-lg">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-heading">{email}</span>
        </p>
      </div>

      {/* OTP INPUTS */}
      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="
              h-14 w-12 rounded-xl border border-gray-300 bg-gray-50
              text-center text-xl font-semibold
              focus:outline-none focus:ring-2 focus:ring-brand
              transition
            "
          />
        ))}
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      {/* RESEND */}
      <div className="mb-8 text-center text-sm text-body">
        Didn’t receive the code?{" "}
        <button className="font-semibold text-brand hover:text-brand-dark transition">
          Resend
        </button>
      </div>

      {/* VERIFY BUTTON */}
      <button
        onClick={handleVerify}
        className="
          w-full rounded-xl bg-amber-400 text-black py-3 font-semibold text-lg
          hover:bg-brand-dark transition-all duration-200
          shadow-lg
        "
      >
        Verify & Continue
      </button>

      {/* BACK */}
      <div
        onClick={() => navigate(-1)}
        className="mt-8 text-center text-sm font-semibold text-muted hover:text-heading cursor-pointer transition"
      >
        ← Go back
      </div>
    </>
  );
}
