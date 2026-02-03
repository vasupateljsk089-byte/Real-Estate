import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Post } from "@/types/post.types";
import { formatPrice } from "@/utils/priceConverstion";
import {
  BookmarkSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

/* ---------- Types ---------- */
interface Props {
  item: Post & { isSaved?: boolean };
  onLocationClick?: () => void;
}

/* ---------- Helpers ---------- */
const capitalize = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

const LandscapeCard = ({ item, onLocationClick }: Props) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(item.isSaved ?? false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev) => !prev);
  };

  return (
    <Link
      to={`/${item.id}`}
      className="group flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="h-32 w-44 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-between">
        {/* INFO BLOCK */}
        <div className="space-y-1.5">
          {/* TITLE */}
          <h2 className="text-sm font-medium text-zinc-900 leading-snug line-clamp-2">
            {item.title}
          </h2>

          {/* TYPE */}
          <p className="text-xs text-zinc-500">
            Type:{" "}
            <span className="text-zinc-800">
              {capitalize(item.property)}
            </span>
          </p>

          {/* CITY */}
          <p className="text-xs text-zinc-500">
            City:{" "}
            <span className="text-zinc-800">
              {item.city}
            </span>
          </p>

          {/* ADDRESS */}
          <p className="text-xs text-zinc-500 line-clamp-1">
            Address:{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onLocationClick?.();
              }}
              className="text-zinc-800 underline underline-offset-2 hover:text-zinc-900"
            >
              {item.address}
            </button>
          </p>

          {/* PRICE */}
          <p className="pt-1 text-xs text-zinc-500">
            {item.type === "rent" ? "Rent" : "Selling Price"} :{" "}
            <span className="font-semibold text-zinc-900">
              ₹ {formatPrice(item.price)}
              {item.type === "rent" && (
                <span className="ml-1 text-xs font-normal text-zinc-500">
                  / month
                </span>
              )}
            </span>
          </p>
        </div>

        {/* BOTTOM */}
        <div className="mt-3 flex items-center justify-between">
          {/* BED / BATH */}
          <div className="flex items-center gap-5 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              <img
                src="/bed.png"
                alt="bed"
                className="h-4 w-4 opacity-70"
              />
              {item.bedroom} Bed
            </span>

            <span className="flex items-center gap-1.5">
              <img
                src="/bath.png"
                alt="bath"
                className="h-4 w-4 opacity-70"
              />
              {item.bathroom} Bath
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            {/* SAVE */}
            <button
              onClick={handleSave}
              className="rounded-md border border-zinc-200 p-2 hover:bg-zinc-100 transition"
              title={saved ? "Saved" : "Save property"}
            >
              <BookmarkSquareIcon
                className={`h-5 w-5 transition ${
                  saved ? "text-amber-600" : "text-zinc-500"
                }`}
              />
            </button>

            {/* CHAT */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate("/chat");
              }}
              className="rounded-md border border-zinc-200 p-2 hover:bg-zinc-100 transition"
              title="Chat with owner"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandscapeCard;
