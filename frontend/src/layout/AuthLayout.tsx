import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT – IMAGE / HERO */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Luxury Real Estate"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />

        {/* Text */}
        <div className="relative z-10 h-full flex items-center px-12">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Find Your Dream <br />
              <span className="text-yellow-400">Home in India</span>
            </h1>
            <p className="text-lg text-white/90">
              Discover premium properties across India with trusted experts.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-xl">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
