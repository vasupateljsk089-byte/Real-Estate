import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import type{LoginPayload} from "@/types/auth.types"
import { login } from "@/services/auth.service";
import type { NavigateFunction } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate:NavigateFunction = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginPayload = {
      email,
      password,
    };
  
    dispatch(login(payload, navigate));
  };

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-heading mb-2">
          Welcome Back
        </h2>
        <p className="text-body text-lg">Sign in to continue</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-3">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-2xl bg-gray-200 px-5 py-4"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl bg-gray-200 px-5 py-4 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-xl bg-amber-400 py-3 font-semibold"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
