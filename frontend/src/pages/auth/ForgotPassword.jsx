import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { apiConnector } from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiConnector.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      if (res.data.success && res.data.resetToken) {
        localStorage.setItem("resetToken", res.data.resetToken);
      }

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-heading mb-2">
          Forgot Password
        </h2>
        <p className="text-body text-lg">
          We’ll send a verification code to your email
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSendOtp} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-heading mb-3">
            Email Address
          </label>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-xl bg-amber-400 text-black py-3 font-semibold text-lg
            hover:bg-brand-dark transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            shadow-lg
          "
        >
          {loading ? "Sending..." : "Send verification code"}
        </button>
      </form>

      {/* BACK LINK */}
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-sm font-semibold text-brand hover:text-brand-dark transition"
        >
          ← Back to login
        </Link>
      </div>
    </>
  );
}
