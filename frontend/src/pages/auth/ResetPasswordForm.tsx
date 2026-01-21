import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import {Button} from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {storage} from "@/utils/storage"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { resetPassword } from "@/services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordForm,
} from "@/validation/auth.validation";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: ResetPasswordForm) => {
    const token : string | null = storage.getOtpToken();
    dispatch(
      resetPassword(
        { password: data.password , 
          token
        },
        navigate
      )
    );
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Password */}
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
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Confirm Password
          </label>

          <div className="relative mb-3">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={`w-full rounded-2xl  pl-12 pr-12 py-4 text-sm outline-none border
                ${
                  errors.confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-200 focus:border-gray-400"
                }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          loading={loading}
          loadingText="Resetting..."
          disabled={!isValid}
        >
          Reset Password
        </Button>

      </form>
    </>
  );
};

export default ResetPassword;
