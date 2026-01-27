import { IoBed, IoExpand } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import type { Post } from "@/types/post.types";
import {getPostById} from "@/services/property.service"

export const Card = ({ data }: { data: Post }) => {
   
  const viewDetails = async(id : string) => {
       // getPostDetail()    
       console.log("User Id : ", id );   
       try{
       const res = await getPostById(id);
       console.log("Data",res)
       }catch(e)
       {
         
       }
  }
    
  const isRent = data.type === "rent";

  const formatPrice = (price: number) => {
    if (price >= 1_00_00_000) return `₹ ${(price / 1_00_00_000).toFixed(2)} Cr`;
    if (price >= 1_00_000) return `₹ ${(price / 1_00_000).toFixed(1)} L`;
    if (price >= 1_000) return `₹ ${(price / 1_000).toFixed(0)} K`;
    return `₹ ${price}`;
  };

  return (
    <div
      className="
        group bg-white/90 backdrop-blur-xl
        rounded-3xl overflow-hidden
        border border-gray-200
        shadow-md hover:shadow-2xl hover:-translate-y-2
        transition-all duration-500

        flex flex-col h-full   /* 🔥 CRITICAL */
      "
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <img
          src={data.images[0]}
          alt={data.title}
          className="h-full w-full object-cover
          group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0
        group-hover:opacity-100 transition-opacity duration-500" />

        {/* BADGE */}
        <span
          className={`
            absolute top-4 left-4
            px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide
            ${isRent ? "bg-emerald-900/90 text-emerald-50" : "bg-wooden/90 text-dark"}
          `}
        >
          {isRent ? "FOR RENT" : "FOR SALE"}
        </span>

        {/* PRICE */}
        <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow">
          <span className="text-serif  font-bold text-dark tracking-tight">
            {formatPrice(data.price)}
            {isRent && (
              <span className="text-xs text-black font-serif"> / mo</span>
            )}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">
        {/* CITY */}
        <p className="text-xs uppercase tracking-widest text-muted font-medium mb-1">
          {data.city}
        </p>

        {/* TITLE */}
        <h3 className="text-base font-semibold text-heading leading-snug mb-2">
          {data.title}
        </h3>

        {/* ADDRESS */}
        <div className="flex items-start gap-2 text-xs text-body mb-4">
          <HiLocationMarker className="mt-0.5 text-wooden" />
          <span className="line-clamp-2">{data.address}</span>
        </div>

        {/* FEATURES */}
        <div className="flex mt-2 justify-between text-sm text-body mb-6">
          <div className="flex items-center gap-1.5">
            <IoBed className="text-wooden text-lg" />
            {data.bedroom} Beds
          </div>

          <div className="flex items-center gap-1.5">
            <FaBath className="text-wooden" />
            {data.bathroom} Baths
          </div>

          <div className="flex items-center gap-1.5">
            <IoExpand className="text-wooden" />
            {data.property.charAt(0).toUpperCase() + data.property.slice(1)}
          </div>
        </div>

        {/* CTA — ALWAYS SAME LEVEL */}
        <button
          className="
            mt-auto                 /* 🔥 MAGIC */
            w-full rounded-xl
            bg-wooden text-dark
            font-semibold py-3
            hover:opacity-90
            transition
          "
          onClick={()=> viewDetails(data.id)}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};
