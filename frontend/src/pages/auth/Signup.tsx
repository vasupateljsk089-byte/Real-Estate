import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {Button} from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { registerUser } from "@/services/auth.service";
import { registerSchema } from "@/validation/auth.validation";
import type { RegisterForm } from "@/validation/auth.validation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors, isValid },} = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: RegisterForm) => {
    dispatch(registerUser(data, navigate));
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Create Account
        </h2>
        <p className="text-gray-500">Sign up to get started</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold">
            Username
          </label>
          <input
            {...register("username")}
            placeholder="Enter your username"
            className={`w-full rounded-2xl px-5 py-4 border outline-none
              ${
                errors.username
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-200 focus:border-gray-400"
              }`}
          />
          {errors.username && (
            <p className="text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold">
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
            <p className="text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Create a password"
              className={`w-full rounded-2xl mb-2 px-5 py-4 pr-12 border outline-none
                ${
                  errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          loading={loading}
          loadingText="Creating..."
          disabled={!isValid}
        >
          Create Account
        </Button>

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
