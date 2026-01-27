import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";

import {useNavigate} from "react-router-dom";
import { profileSchema } from "@/validation/auth.validation";
import type { ProfileForm } from "@/validation/auth.validation";
import type { storedUser } from "@/store/slices/auth.slice"; // adjust path if needed
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { updateUserProfile } from "@/services/user.service";
import { Button } from "@/components/ui/Button";
import { storage } from "@/utils/storage";
const PROFILE_IMAGE = "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F483102%2F6d940290-12d0-4c4a-8be9-1a9fc955d203.jpeg";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  /* 🔹 IMPORTANT: hydrate user from localStorage into React state */
  const [user, setUser] = useState<storedUser | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /* 🔹 Load user ONCE on page refresh */
  useEffect(() => {
    const storedUser = storage.getUser();
    setUser(storedUser);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      city: "",
      gender: "",
    },
  });

  /* 🔹 Sync form + avatar when user is available */
  useEffect(() => {
    if (!user) return;

    reset({
      username: user.username ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      city: user.city ?? "",
      gender: user.gender ?? "",
    });

    setPreview(user.profileImage ?? PROFILE_IMAGE);
  }, [user, reset]);

  /* 🔹 Avatar change */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* 🔹 Submit */
  const onSubmit = (data: ProfileForm) => {
    const formData = new FormData();

    if (data.username) formData.append("username", data.username);
    if (data.phone) formData.append("phone", data.phone);
    if (data.city) formData.append("city", data.city);
    if (data.gender) formData.append("gender", data.gender);
    if (avatarFile) formData.append("profileImage", avatarFile);

    dispatch(updateUserProfile(formData));
  };

  /* 🔹 Loading state */
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="mb-2 shadow-emerald-50">
        {/* Header */}
          <h2 className="text-2xl text-center font-semibold text-gray-900">
            Profile Settings
          </h2>
          <p className="text-sm text-center text-gray-500 mt-1">
            Update your personal information
          </p>

        {/* Avatar */}
        <section className="flex flex-col items-center justify-center mt-5 gap-4 mb-10">
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

          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Profile photo
            </p>
            <p className="text-xs text-gray-500">
              JPG or PNG • Max 5MB
            </p>
          </div>
        </section>


        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              {...register("username")}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.username && (
              <p className="text-xs text-red-600 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email (readonly) */}
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
              maxLength={10}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register("city")}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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

          {/* Save */}
          <div className="pt-4">
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </div>
        </form>

        <div
        onClick={() => navigate(-1)}
        className="mt-8 text-center text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition"
      >
        ← Go back
      </div>
      </div>
  );
};

export default Profile;
