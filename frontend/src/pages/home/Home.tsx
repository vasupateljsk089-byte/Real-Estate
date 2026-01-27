import SearchBar from "@/components/searchBar/SearchBar";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/services/property.service";
import type { Post } from "@/types/post.types";
import { Card } from "@/pages/home/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[95vh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-[center_30%]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="mt-20">
                <h1
                  className="
                    font-heading text-4xl lg:text-5xl font-bold text-white leading-tight
                    [text-shadow:2px_2px_6px_rgba(0,0,0,0.35)]
                  "
                >
                  Find Your Dream <br />
                  <span className="text-brand">Home in India</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-white/90 leading-relaxed">
                  Discover over 20,000+ properties in Mumbai, Delhi, Bangalore
                  and more. Buy, rent, or invest with confidence.
                </p>
              </div>
            </div>

            {/* SEARCH BAR */}
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER + VIEW ALL */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-heading">
                Featured Properties
              </h2>
              <p className="mt-3 text-lg text-body max-w-2xl">
                Handpicked modern homes in prime Indian locations.
              </p>
            </div>

            <button
              onClick={() => navigate("/list")}
              className="
                hidden sm:inline-flex
                items-center gap-2
                rounded-xl
                border border-dark
                px-6 py-3
                text-sm font-semibold
                text-dark
                hover:bg-wooden hover:text-dark hover:border-wooden
                transition
              "
            >
              View All →
            </button>
          </div>

          {/* CARDS (ONLY FIRST 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.slice(0, 3).map((property) => (
              <Card key={property.id} data={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
