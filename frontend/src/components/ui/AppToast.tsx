import { toast } from "react-hot-toast";
import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import type { JSX } from "react";

type ToastType = "success" | "error" | "info";

const toastStyles: Record<
  ToastType,
  {
    accent: string;
    icon: JSX.Element;
  }
> = {
  success: {
    accent: "bg-green-500",
    icon: <CheckCircle size={20} className="text-green-600" />,
  },
  error: {
    accent: "bg-orange-500",
    icon: <AlertTriangle size={20} className="text-orange-600" />,
  },
  info: {
    accent: "bg-blue-500",
    icon: <Info size={20} className="text-blue-600" />,
  },
};

export function showToast(
  type: ToastType,
  title: string,
  description?: string
) {
  toast.custom(
    (t) => (
      <div
        className="
          relative flex gap-3 items-start
          bg-white
          rounded-xl
          px-4 py-3
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          inline-flex
          max-w-[420px]
        "
      >
        {/* Accent bar */}
        <span
          className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${toastStyles[type].accent}`}
        />

        {/* Icon */}
        <div className="mt-0.5 shrink-0">
          {toastStyles[type].icon}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            {title}
          </p>
          {description && (
            <p className="mt-1 text-sm text-gray-600 leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>
    ),
    {
      duration: 3000,
      position: "top-right",
    }
  );
}
