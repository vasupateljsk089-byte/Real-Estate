import Map from "@/components/map/Map";
import { useState, useEffect, useMemo } from "react";
import type { Post } from "@/types/post.types";
import { getAllPosts } from "@/services/property.service";
import LandscapeCard from "@/pages/listPage/LandscapeCard";

const ListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  /* 🔍 Filters */
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [bedroom, setBedroom] = useState("all");

  /* Fetch data */
  const fetchData = async () => {
    try {
      const res = await getAllPosts({});
      setPosts(res.data.data ?? []);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* 🧠 Filter logic */
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.address.toLowerCase().includes(search.toLowerCase()) ||
        post.city.toLowerCase().includes(search.toLowerCase());

      const matchType =
        propertyType === "all" || post.property === propertyType;

      const matchBedroom =
        bedroom === "all" || post.bedroom === Number(bedroom);

      return matchSearch && matchType && matchBedroom;
    });
  }, [posts, search, propertyType, bedroom]);

  return (
    <div className="h-[calc(100vh-80px)] bg-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

        {/* LEFT SIDE */}
        <div className="border-r border-muted bg-white overflow-y-auto">

          {/* 🔍 SEARCH & FILTER BAR */}
          <div className="sticky top-0 z-10 bg-white border-b border-muted p-4 space-y-3">

            {/* Search */}
            <input
              type="text"
              placeholder="Search by city, address, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
            />

            {/* Filters */}
            <div className="flex gap-3">
              {/* Property Type */}
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>

              {/* Bedrooms */}
              <select
                value={bedroom}
                onChange={(e) => setBedroom(e.target.value)}
                className="w-1/2 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              >
                <option value="all">Any Bedroom</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Bed</option>
                <option value="3">3 Bed</option>
                <option value="4">4+ Bed</option>
              </select>
            </div>

            {/* Result count */}
            <p className="text-xs text-zinc-500">
              {filteredPosts.length} properties found
            </p>
          </div>

          {/* 🏠 PROPERTY LIST */}
          <div className="p-4 space-y-4">
            {filteredPosts.map((post) => (
              <LandscapeCard key={post.id} item={post} />
            ))}

            {filteredPosts.length === 0 && (
              <p className="text-sm text-zinc-500 text-center mt-8">
                No properties found
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (MAP) */}
        <div className="hidden lg:block relative">
          <Map items={filteredPosts} />
        </div>

      </div>
    </div>
  );
};

export default ListPage;
