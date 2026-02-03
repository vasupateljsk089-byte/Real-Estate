import Map from "@/components/map/Map";
import { useEffect, useState } from "react";
import type { Post, Filters } from "@/types/post.types";
import type { Search } from "@/types/search.types";
import { getAllPosts } from "@/services/property.service";
import LandscapeCard from "@/pages/listPage/LandscapeCard";
import PropertyFilters from "./PropertyFilters";

/* 🔄 Normalize UI filters → API filters */
const normalizeFilters = (filters: Search): Filters => ({
  search: filters.search || undefined,
  type: filters.type === "all" ? undefined : filters.type,
  property: filters.property === "all" ? undefined : filters.property,
  bedroom: filters.bedroom === "all" ? undefined : filters.bedroom,
  minPrice: filters.minPrice,
  maxPrice: filters.maxPrice,
});

const ListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔍 Filters (single source of truth) */
  const [filters, setFilters] = useState<Search>({
    search: "",
    type: "all",
    property: "all",
    bedroom: "all",
    minPrice: undefined,
    maxPrice: undefined,
  });

  /* 📡 Fetch data when filters change */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiFilters = normalizeFilters(filters);
        const res = await getAllPosts(apiFilters);
        setPosts(res.data.data ?? []);
      } catch (e) {
        console.error("Failed to fetch posts", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 to-zinc-100/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT SIDE - PROPERTY LIST */}
        <div className="border-r border-zinc-200/60 bg-white overflow-y-auto">
          {/* FILTERS */}
          <PropertyFilters filters={filters} onChange={setFilters} />

          {/* RESULTS HEADER */}
          {!loading && (
            <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600">
                  <span className="font-semibold text-zinc-900">{posts.length}</span>{" "}
                  {posts.length === 1 ? "property" : "properties"} found
                </p>
                {posts.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Live updates
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROPERTY LIST */}
          <div className="p-5 space-y-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-zinc-200 border-t-amber-600 rounded-full animate-spin" />
                </div>
                <p className="mt-4 text-sm text-zinc-500 font-medium">
                  Loading properties...
                </p>
              </div>
            )}

            {!loading && posts.map((post) => (
              <LandscapeCard key={post.id} item={post} />
            ))}

            {!loading && posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  No properties found
                </h3>
                <p className="text-sm text-zinc-500 text-center max-w-xs">
                  Try adjusting your filters or search criteria to find more results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - MAP */}
        <div className="hidden lg:block relative bg-zinc-100">
          <Map items={posts} />
          
          {/* MAP OVERLAY - PROPERTY COUNT */}
          {posts.length > 0 && (
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg px-4 py-2.5 border border-zinc-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-900">
                  {posts.length} {posts.length === 1 ? "property" : "properties"} on map
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;