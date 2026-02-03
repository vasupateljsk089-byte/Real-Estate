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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <img
              src="/logo.png"
              alt="logo"
              className="w-11 h-11 rounded-2xl shadow-sm ring-2 ring-zinc-100 transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-600 bg-clip-text text-transparent">
            DreamHome
          </span>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-1 bg-zinc-50/80 rounded-full px-2 py-1.5 border border-zinc-200/50">
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
                `px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              {/* LOGIN */}
              <NavLink
                to="/login"
                className="px-5 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 border border-zinc-200 rounded-full hover:bg-zinc-50 transition-all"
              >
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink
                to="/register"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-amber-500 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <div className="flex items-center gap-3 px-3 py-2 rounded-full border border-zinc-200 bg-white hover:shadow-md transition-all cursor-pointer">
                <img
                  src={
                    user?.profileImage ||
                    "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F483102%2F6d940290-12d0-4c4a-8be9-1a9fc955d203.jpeg"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full ring-2 ring-zinc-100"
                />
                <svg
                  className="w-4 h-4 text-zinc-400 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all origin-top-right">
                <div className="p-3 border-b border-zinc-100">
                  <p className="text-sm font-medium text-zinc-900">{user?.username || "User"}</p>
                  <p className="text-xs text-zinc-500 truncate">{user?.email || ""}</p>
                </div>
                
                <NavLink
                  to="/profile"
                  className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </div>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-2xl transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;