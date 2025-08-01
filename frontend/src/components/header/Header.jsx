import { Link } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import logo from"../../assets/logo.svg";

export default function Header() {
  return (
    <header className="bg-[#032541] text-white h-16">

      <div className="container mx-auto flex flex-row gap-x-[502px] py-4">

        <nav className=" ml-40 flex space-x-6 text-lg font-semibold items-center ">
          <Link to="/" className="hover:underline">
            <img src={logo} class="w-40 h-auto"/>
          </Link>
          <Link to="/movie" className="hover:underline">Movies</Link>
          <Link to="/tv" className="hover:underline">TV Shows</Link>
          <Link to="/people" className="hover:underline">People</Link>
          <Link to="/more" className="hover:underline">More</Link>
        </nav>

        
        <div className=" flex items-center space-x-6 font-semibold ">
          
          {/* <button className="border border-white px-2 py-1 text-lg rounded">EN</button> */}
          <Link to="/login" className="hover:underline text-lg">Login</Link>
          <Link to="/signup" className="hover:underline text-lg">Join TMDB</Link>
          <FiSearch className="text-cyan-400 text-2xl cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
