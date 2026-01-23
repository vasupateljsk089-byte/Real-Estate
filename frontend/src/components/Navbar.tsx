import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { logoutUser } from "@/services/auth.service";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { authLoading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

   if (authLoading) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto pl-4 pr-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* NAV LINKS */}
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
                ${
                  isActive
                    ? "text-wooden font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-brand"
                    : "text-gray-200 hover:text-brand"
                }
                `
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center gap-4">

          {/* 🔐 AUTH CONDITIONAL UI */}
          {!isAuthenticated ? (
            <>
              {/* LOGIN */}
              <NavLink
                to="/login"
                className="
                  w-24 px-4 py-2 text-center text-sm font-medium
                  text-black border-2 border-gray-600
                  rounded-3xl transition
                "
              >
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink
                to="/register"
                className="
                  w-24 px-4 py-2 text-sm text-center font-medium
                  text-black bg-[#C2A68C]
                  rounded-3xl transition
                "
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {/* PROFILE */}
              <div className="relative group">
                <img
                  src={
                    user?.profileImage ||
                    "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F483102%2F6d940290-12d0-4c4a-8be9-1a9fc955d203.jpeg"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />

                {/* DROPDOWN */}
                <div className="
                  absolute right-0 mt-2 w-40
                  bg-white rounded-xl shadow-lg
                  opacity-0 scale-95
                  group-hover:opacity-100 group-hover:scale-100
                  transition-all
                ">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-xl"
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
