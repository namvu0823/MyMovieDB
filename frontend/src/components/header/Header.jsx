import { Link } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import logo from"../../assets/logo.svg";
import { useAuth } from "../authcontext/AuthContext";
import { useState } from "react";

export default function Header() {
  const {user,logout} = useAuth();
  const [open,setOpen]= useState(false);

  return (
    <header className="bg-[#032541] text-white h-16">

      <div className="container mx-auto flex flex-row gap-x-[502px] py-4">

        <nav className=" ml-40 flex space-x-6 text-lg font-semibold items-center ">
          <Link to="/" className="hover:underline">
            <img src={logo} className="w-40 h-auto"/>
          </Link>
          <Link to="/movie" className="hover:underline">Movies</Link>
          <Link to="/tv" className="hover:underline">TV Shows</Link>
          <Link to="/people" className="hover:underline">People</Link>
          <Link to="/more" className="hover:underline">More</Link>
        </nav>

        
        <div className=" flex items-center space-x-6 font-semibold ">
          
          {user?(
            <>
              <FiBell className="text-2xl cursor-pointer hover:text-cyan-400"/>

              <div className="relative">
                <button onClick={()=> setOpen(!open)} className="bg-cyan-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {user.userName ? user.userName[0].toUpperCase() : "N"}
                </button>
                {
                  open&&(
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link>
                      <Link to="/edit_profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile </Link>
                      <button onClick={logout} className="block px-4 py-2 hover:bg-gray-100">Logout</button>
                    </div>
                  )
                }
              </div>
            </>
          ):(
            <>
              <Link to="/login" className="hover:underline text-lg">Login</Link>
              <Link to="/signup" className="hover:underline text-lg">Join TMDB</Link>
            </>
          )}

          <FiSearch className="text-cyan-400 text-2xl cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
