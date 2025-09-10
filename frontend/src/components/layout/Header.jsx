
import { Link } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { useAuth } from "../authcontext/AuthContext";
import { useState } from "react";
import SearchBar from "../common/SearchBar";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className="bg-[#032541] text-white h-16  ">
        <div className="container mx-auto flex flex-row gap-x-[502px] py-4">
          {/* Menu chính */}
          <nav className="ml-40 flex space-x-6 text-lg font-semibold items-center relative">
            <Link to="/" className="hover:underline">
              <img src={logo} className="w-40 h-auto" />
            </Link>

            {/* Movies dropdown */}
            <div className="relative group">
              <span className="cursor-pointer hover:underline">Movies</span>
              <div className="absolute left-0 hidden group-hover:block bg-white text-black text-sm font-normal rounded-lg shadow-lg mt-2 w-40 z-50">
                <Link
                  to="/categories?type=movie&category=popular"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Popular
                </Link>
                <Link
                  to="/categories?type=movie&category=now_playing"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Now Playing
                </Link>
                <Link
                  to="/categories?type=movie&category=upcoming"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Upcoming
                </Link>
                <Link
                  to="/categories?type=movie&category=top_rated"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Top Rated
                </Link>
              </div>
            </div>

            {/* TV Shows dropdown */}
            <div className="relative group">
              <span className="cursor-pointer hover:underline">TV Shows</span>
              <div className="absolute left-0 hidden group-hover:block bg-white text-black text-sm font-normal rounded-lg shadow-lg mt-2 w-40 z-50">
                <Link
                  to="/categories?type=tv&category=popular"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Popular
                </Link>
                <Link
                  to="/categories?type=tv&category=on_the_air"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Now Playing
                </Link>
                <Link
                  to="/categories?type=tv&category=top_rated"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Top Rated
                </Link>
              </div>
            </div>

            <Link to="/people" className="hover:underline">
              People
            </Link>
            <Link to="/more" className="hover:underline">
              More
            </Link>
          </nav>

          {/* User + Notification + Search */}
          <div className="flex items-center space-x-6 font-semibold">
            {user ? (
              <>
                <FiBell className="text-2xl cursor-pointer hover:text-cyan-400" />

                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="bg-cyan-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {user.display_name ? user.display_name[0].toUpperCase() : "P"}
                  </button>
                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black text-sm font-normal rounded-lg shadow-lg overflow-hidden z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <Link
                        to="/edit_profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline text-lg">
                  Login
                </Link>
                <Link to="/signup" className="hover:underline text-lg">
                  Join TMDB
                </Link>
              </>
            )}

            <FiSearch className="text-cyan-400 text-2xl cursor-pointer" />
          </div>
        </div>
        
      </header>
      <div className="w-full px-36 border-b-2"><SearchBar variant="header"/></div>
    </div>
  );
}
