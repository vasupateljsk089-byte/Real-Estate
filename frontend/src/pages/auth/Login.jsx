import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-heading mb-2">
          Welcome Back
        </h2>
        <p className="text-body text-lg">Sign in to continue</p>
      </div>

      <form className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-3">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-2xl border border-border px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-3">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-border px-5 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-brand transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-brand hover:text-brand-hover font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-amber-400 text-black py-3 font-semibold text-lg hover:bg-brand-hover transition-all duration-200 shadow-lg"
        >
          Sign In
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-body">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-brand hover:text-brand-hover">
          Create one here
        </Link>
      </p>
    </>
  );
};

export default Login;
