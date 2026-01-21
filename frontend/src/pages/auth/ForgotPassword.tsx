import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import {Button} from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { forgotPassword } from "@/services/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordForm,
} from "@/validation/auth.validation";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange", 
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    dispatch(forgotPassword(data, navigate));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
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
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          loading={loading}
          loadingText="Sending..."
          disabled={!isValid}
        >
          Send verification code
        </Button>
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
