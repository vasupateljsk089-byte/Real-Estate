import type { Filters } from "@/types/post.types";
import type { Search } from "@/types/post.types"; // or same file

interface Props {
  filters: Search;
  onChange: (filters: Search) => void;
}

const PropertyFilters = ({ filters, onChange }: Props) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-muted p-4 space-y-3">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by city, address, title..."
        value={filters.search ?? ""}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
      />

      {/* RENT / SELL */}
      <div className="flex gap-2">
        {(["all", "rent", "buy"]  ).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() =>
              onChange({ ...filters, type: value })
            }
            className={`flex-1 rounded-lg border px-3 py-2 text-sm transition
              ${
                filters.type === value
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"
              }`}
          >
            {value === "all"
              ? "All"
              : value === "rent"
              ? "Rent"
              : "Sell"}
          </button>
        ))}
      </div>

      {/* PROPERTY + BEDROOM */}
      <div className="flex gap-3">
        {/* PROPERTY */}
        <select
          value={filters.property ?? "all"}
          onChange={(e) =>
            onChange({
              ...filters,
              property: e.target.value as Filters["property"],
            })
          }
          className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="plot">Plot</option>
        </select>

        {/* BEDROOM */}
        <select
          value={filters.bedroom ?? "all"}
          onChange={(e) =>
            onChange({
              ...filters,
              bedroom:
                e.target.value === "all"
                  ? "all"
                  : Number(e.target.value),
            })
          }
          className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="all">Any Bedroom</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Bed</option>
          <option value="3">3 Bed</option>
          <option value="4">4+ Bed</option>
        </select>
      </div>

      {/* PRICE RANGE */}
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              minPrice: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
          className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              maxPrice: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
          className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default PropertyFilters;
