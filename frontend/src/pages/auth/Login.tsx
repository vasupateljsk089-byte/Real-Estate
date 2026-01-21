import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {Button} from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { login } from "@/services/auth.service";
import { loginSchema } from "@/validation/auth.validation";
import type { LoginForm } from "@/validation/auth.validation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: LoginForm) => {
    dispatch(login(data, navigate));
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500">Sign in to continue</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`w-full rounded-2xl px-5 py-4 border outline-none
              ${
                errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-200 focus:border-gray-400"
              }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
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
              placeholder="Enter your password"
              className={`w-full rounded-2xl px-5 py-4 pr-12 border outline-none
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
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          disabled={!isValid}
        >
          Sign In
        </Button>
      </form>

      {/* Register */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          Create one
        </Link>
      </p>
    </>
  );
};

export default Login;
