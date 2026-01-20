import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50
      bg-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto pl-4 pr-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="font-heading text-xl text-heading">
         <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        </div>

        <nav className="hidden md:flex gap-8 font-bold">
          {[
            { to: "/", label: "Home" },
            { to: "/buy", label: "Buy" },
            { to: "/rent", label: "Rent" },
            { to: "/projects", label: "New Projects" },
            { to: "/agents", label: "Agents" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `
                relative pb-1 transition
                ${isActive
                  ? "text-wooden font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-brand"
                  : "text-gray-200 hover:text-brand"}
                `
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>


        <div className="flex items-center gap-4">
  {/* LOGIN */}
  <NavLink
    to="/login"
    className="
      flex items-center justify-center
      w-24 px-4 py-2
      text-sm font-medium
      text-black
      border-2 border-gray-600
      rounded-3xl
      
      transition
    "
  >
    Login
  </NavLink>

  {/* REGISTER */}
  <NavLink
    to="/register"
    className="
      flex items-center justify-center
      w-24 px-4 py-2
      text-sm font-medium
      text-black
      bg-[#C2A68C]
      border-[#C2A68C]
      rounded-3xl
      transition
    "
  >
    Register
  </NavLink>
</div>

      </div>
    </header>
  );
};

export default Navbar;
