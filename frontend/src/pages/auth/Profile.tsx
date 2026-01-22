import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { profileSchema } from "@/validation/auth.validation";
import type { ProfileForm } from "@/validation/auth.validation";
import { useAppSelector } from "@/hooks/hooks";

const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  const [preview, setPreview] = useState<string | null>(
    user?.avtar || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",          // ✅ validate only on submit
    reValidateMode: "onSubmit", 
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile Update Data:", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          My Profile
        </h2>
        <p className="text-gray-500">Update your personal information</p>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-10">
        <div className="relative">
          <img
            src={preview || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow"
          />

          {/* Edit Icon */}
          <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition">
            <Camera size={18} className="text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            {...register("name")}
            placeholder="Enter full name"
            className={`w-full rounded-2xl px-5 py-4 border outline-none transition
              ${
                errors.name
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-100 focus:border-blue-500"
              }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email (VISIBLE but NOT editable) */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            {...register("email")}
            readOnly
            className="w-full rounded-2xl px-5 py-4 border bg-gray-50 text-gray-700 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">
            Email address cannot be changed
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            {...register("phone")}
            placeholder="Enter phone number"
            className={`w-full rounded-2xl px-5 py-4 border outline-none transition
              ${
                errors.phone
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-100 focus:border-blue-500"
              }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          loading={loading}
          loadingText="Saving..."
        //   disabled={!isValid}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
