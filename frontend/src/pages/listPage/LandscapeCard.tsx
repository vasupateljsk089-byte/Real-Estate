import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Post } from "@/types/post.types";
import { formatPrice } from "@/utils/priceConverstion";
import {
  BookmarkSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { BookmarkSquareIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

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
      className="group flex gap-5 rounded-2xl border border-zinc-200/60 bg-white p-4 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300/60 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-36 w-52 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* TYPE BADGE */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm rounded-full shadow-lg">
            {item.type === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>

        {/* PRICE OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
          <p className="text-lg font-bold text-white">
            ₹ {formatPrice(item.price)}
            {item.type === "rent" && (
              <span className="text-xs font-normal text-white/80 ml-1">
                /mo
              </span>
            )}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-between py-1">
        {/* INFO BLOCK */}
        <div className="space-y-2">
          {/* TITLE */}
          <h2 className="text-base font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
            {item.title}
          </h2>

          {/* METADATA ROW */}
          <div className="flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 text-zinc-600">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{item.city}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-zinc-600">
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium">{capitalize(item.property)}</span>
            </span>
          </div>

          {/* ADDRESS */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLocationClick?.();
            }}
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors line-clamp-1 text-left group/address"
          >
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="group-hover/address:underline underline-offset-2">
                {item.address}
              </span>
            </span>
          </button>
        </div>

        {/* BOTTOM */}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-zinc-100">
          {/* BED / BATH */}
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-sm text-zinc-700">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <img
                  src="/bed.png"
                  alt="bed"
                  className="w-5 h-5 opacity-70"
                />
              </div>
              <span className="font-medium">{item.bedroom}</span>
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-zinc-700">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <img
                  src="/bath.png"
                  alt="bath"
                  className="w-5 h-5 opacity-70"
                />
              </div>
              <span className="font-medium">{item.bathroom}</span>
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            {/* SAVE */}
            <button
              onClick={handleSave}
              className="group/save relative rounded-xl border border-zinc-200 p-2.5 hover:bg-amber-50 hover:border-amber-200 transition-all"
              title={saved ? "Saved" : "Save property"}
            >
              {saved ? (
                <BookmarkSolidIcon className="w-5 h-5 text-amber-600" />
              ) : (
                <BookmarkSquareIcon className="w-5 h-5 text-zinc-400 group-hover/save:text-amber-600 transition-colors" />
              )}
            </button>

            {/* CHAT */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate("/chat");
              }}
              className="rounded-xl border border-zinc-200 p-2.5 hover:bg-blue-50 hover:border-blue-200 transition-all group/chat"
              title="Chat with owner"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-zinc-400 group-hover/chat:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandscapeCard;