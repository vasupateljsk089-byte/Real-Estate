import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/auth.service";
import { registerSchema } from "../../validation/auth.validation";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

 const validateField = (name, value) => {
  const fieldSchemas = {
    email: registerSchema.shape.email,
    username: registerSchema.shape.username,
    password: registerSchema.shape.password,
  };

  const schema = fieldSchemas[name];
  if (!schema) return null; // safety guard

  const result = schema.safeParse(value);

  if (result.success) return null;

  // Zod-safe error access
  return result.error?.issues?.[0]?.message || "Invalid value";
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const isFormValid =
    Object.values(formData).every(Boolean) &&
    Object.values(errors).every((err) => !err);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch(registerUser(formData, navigate));
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="font-heading text-3xl font-bold text-heading">
          Create Account
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USERNAME */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">
            User Name
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-2xl border px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">
            Email Address
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-muted"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full rounded-xl bg-amber-400 py-3 font-semibold text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand">
          Sign in here
        </Link>
      </p>
    </>
  );
};

export default Register;
