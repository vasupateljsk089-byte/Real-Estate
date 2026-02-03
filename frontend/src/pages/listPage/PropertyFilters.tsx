import type { Filters } from "@/types/post.types";
import type { Search } from "@/types/search.types";

interface Props {
  filters: Search;
  onChange: (filters: Search) => void;
}

const PropertyFilters = ({ filters, onChange }: Props) => {
  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-sm">
      <div className="p-5 space-y-4">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">Filter Properties</h3>
          <button
            onClick={() =>
              onChange({
                search: "",
                type: "all",
                property: "all",
                bedroom: "all",
                minPrice: undefined,
                maxPrice: undefined,
              })
            }
            className="text-sm text-zinc-500 hover:text-amber-600 transition-colors font-medium"
          >
            Clear all
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by city, address, title..."
            value={filters.search ?? ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full rounded-xl border border-zinc-200 pl-12 pr-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
        </div>

        {/* RENT / SELL TOGGLE */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-50 rounded-xl">
          {(["all", "rent", "buy"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ ...filters, type: value })}
              className={`relative py-2.5 rounded-lg text-sm font-medium transition-all ${
                filters.type === value
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {value === "all" ? "All" : value === "rent" ? "Rent" : "Buy"}
            </button>
          ))}
        </div>

        {/* PROPERTY TYPE + BEDROOM */}
        <div className="grid grid-cols-2 gap-3">
          {/* PROPERTY TYPE */}
          <div className="relative">
            <select
              value={filters.property ?? "all"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  property: e.target.value as Filters["property"] | "all",
                })
              }
              className="w-full appearance-none rounded-xl border border-zinc-200 pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* BEDROOM */}
          <div className="relative">
            <select
              value={filters.bedroom ?? "all"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  bedroom: e.target.value === "all" ? "all" : Number(e.target.value),
                })
              }
              className="w-full appearance-none rounded-xl border border-zinc-200 pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white cursor-pointer"
            >
              <option value="all">Any Bedroom</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* PRICE RANGE */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                ₹
              </span>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full rounded-xl border border-zinc-200 pl-8 pr-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                ₹
              </span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full rounded-xl border border-zinc-200 pl-8 pr-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;