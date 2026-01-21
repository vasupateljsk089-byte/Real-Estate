import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { registerUser } from "@/services/auth.service";
import { useZodForm } from "@/hooks/useZodForm";
import { registerSchema } from "@/validation/auth.validation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, isValid, register } =
    useZodForm(registerSchema);

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    dispatch(registerUser(values as any, navigate));
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Create Account
        </h2>
        <p className="text-gray-500">Sign up to get started</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Username
          </label>
          <input
            {...register("username")}
            placeholder="Enter your username"
            className={`w-full rounded-2xl px-5 py-4 outline-none border
              ${
                errors.username
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-200 focus:border-gray-400"
              }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`w-full rounded-2xl px-5 py-4 outline-none border
              ${
                errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-200 focus:border-gray-400"
              }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Create a password"
              className={`w-full rounded-2xl px-5 py-4 pr-12 outline-none border
                ${
                  errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full rounded-xl py-3 font-semibold transition
            ${
              !isValid || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-500"
            }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          Sign in here
        </Link>
      </p>
    </>
  );
};

export default Register;
