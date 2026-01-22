import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";

import { profileSchema } from "@/validation/auth.validation";
import type { ProfileForm } from "@/validation/auth.validation";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { updateUserProfile } from "@/services/user.service";
import { Button } from "@/components/ui/Button";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [preview, setPreview] = useState<string | null>(
    user?.avtar || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: user?.city || "",
      gender: user?.gender || "",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.city) formData.append("city", data.city);
    if (data.gender) formData.append("gender", data.gender);
    if (avatarFile) formData.append("avatar", avatarFile);

    dispatch(updateUserProfile(formData));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information
          </p>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative">
            <img
              src={preview || "/avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow transition">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Profile photo
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              {...register("name")}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              {...register("phone")}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City + Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register("city")}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
