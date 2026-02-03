import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Post } from "@/types/post.types";
import { formatPrice } from "@/utils/priceConverstion";

interface PinProps {
  item: Post;
  isActive?: boolean; // 🔑 controls popup open
}

const Pin = ({ item, isActive = false }: PinProps) => {
  const markerRef = useRef<L.Marker>(null);

  // Open popup when active
  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  return (
    <Marker
      ref={markerRef}
      position={[
        Number(item.latitude),
        Number(item.longitude),
      ]}
    >
      <Popup closeButton>
        <div className="flex w-64 gap-3 bg-white rounded-lg shadow-lg overflow-hidden">

          {/* Image */}
          <img
            src={item.images?.[0]}
            alt={item.title}
            className="w-20 h-20 object-cover brightness-95 flex-shrink-0"
          />

          {/* Content */}
          <div className="flex flex-col justify-between py-2 pr-3 flex-1">

            {/* Title */}
            <Link
              to={`/${item.id}`}
              className="text-xs font-medium text-zinc-900 leading-snug line-clamp-2 hover:underline"
            >
              {item.title}
            </Link>

            {/* Meta + Price */}
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                {item.bedroom} Bed
              </span>

              <span className="text-xs font-semibold text-zinc-800">
                ₹ {formatPrice(item.price)}
                {item.type === "rent" && (
                  <span className="text-zinc-500 font-normal"> / mo</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
