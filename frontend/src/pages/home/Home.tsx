import { HiLocationMarker } from "react-icons/hi";
import { IoBed, IoExpand } from "react-icons/io5";
import { FaBath } from "react-icons/fa";

const Home = () => {
  const properties = [
    {
      id: 1,
      badge: "FOR SALE",
      badgeColor: "bg-gray-800",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      price: "₹ 4.5 Cr",
      location: "SOUTH MUMBAI",
      title: "Luxury Sea View Apartment",
      address: "Marine Lines, Mumbai",
      beds: 3,
      baths: 3,
      sqft: "1,800 sqft",
    },
    {
      id: 2,
      badge: "NEW LAUNCH",
      badgeColor: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      price: "₹ 1.2 Cr",
      location: "BANGALORE EAST",
      title: "Green Valley Villa",
      address: "Whitefield, Bangalore",
      beds: 4,
      baths: 4,
      sqft: "2,500 sqft",
    },
    {
      id: 3,
      badge: "FOR RENT",
      badgeColor: "bg-teal-600",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      price: "₹ 85,000 / mo",
      location: "GURUGRAM",
      title: "Cyber City Penthouse",
      address: "Sector 42, Gurugram",
      beds: 2,
      baths: 2,
      sqft: "1,200 sqft",
    },
  ];

  return (
    <>
      <section className="relative min-h-[95vh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-[center_30%] motion-safe:animate-pan"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="mt-20">
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight
                [text-shadow:2px_2px_6px_rgba(0,0,0,0.35)]">
                  Find Your Dream <br />
                  <span className="text-brand">Home in India</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-white/90 leading-relaxed">
                  Discover over 20,000+ properties in Mumbai, Delhi, Bangalore
                  and more. Buy, rent, or invest with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-heading">
              Featured Properties
            </h2>
            <p className="mt-4 text-lg text-body max-w-2xl">
              Handpicked modern homes in prime Indian locations.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {properties.map((property) => (
              <div
                key={property.id}
                className="group relative bg-white/80 backdrop-blur-xl
                rounded-3xl overflow-hidden border border-white/40
                shadow-lg hover:-translate-y-2 hover:shadow-2xl
                transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover
                    group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0
                  group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 ${property.badgeColor}
                    text-white text-xs font-semibold px-4 py-1.5 rounded-full`}
                  >
                    {property.badge}
                  </span>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-white/95
                  backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <span className="text-yellow-500 font-bold text-lg">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs tracking-wider text-gray-500 font-semibold mb-2">
                    {property.location}
                  </p>

                  <h3 className="text-lg font-semibold leading-snug text-heading
                  group-hover:text-brand transition-colors">
                    {property.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-body">
                    <HiLocationMarker className="text-brand" />
                    {property.address}
                  </div>

                  <div className="my-5 h-px bg-gray-100" />

                  {/* Features */}
                  <div className="flex justify-between text-sm text-body">
                    <div className="flex items-center gap-1.5">
                      <IoBed className="text-yellow-500 text-lg" />
                      {property.beds} Beds
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FaBath className="text-yellow-500" />
                      {property.baths} Baths
                    </div>

                    <div className="flex items-center gap-1.5">
                      <IoExpand className="text-yellow-500" />
                      {property.sqft}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="mt-6 w-full rounded-xl bg-brand/10 text-brand
                  font-semibold py-3 hover:bg-brand hover:text-white transition">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
