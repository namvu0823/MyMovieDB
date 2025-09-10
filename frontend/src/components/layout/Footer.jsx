
import logo_footer from "../../assets/logo_footer.svg";
import { useAuth } from "../authcontext/AuthContext";

export default function Footer() {

  const {user} = useAuth();

  return (
    <footer className="bg-[#032541] text-white pt-6 pb-10 px-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
  
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo_footer} className="w-36 h-36"/>
          <button className=" w-36 bg-white text-[#01b4e4] font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            {user?(user.display_name):("Join Us")}
          </button>
        </div>

        
        <div className="mt-8">
          <h3 className="font-bold mb-3">THE BASICS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About TMDB</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Support Forums</a></li>
            <li><a href="#" className="hover:underline">API Documentation</a></li>
            <li><a href="#" className="hover:underline">System Status</a></li>
          </ul>
        </div>

        
        <div className="mt-8">
          <h3 className="font-bold mb-3">GET INVOLVED</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Contribution Bible</a></li>
            <li><a href="#" className="hover:underline">Add New Movie</a></li>
            <li><a href="#" className="hover:underline">Add New TV Show</a></li>
          </ul>
        </div>

      
        <div className="mt-8">
          <h3 className="font-bold mb-3">COMMUNITY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Guidelines</a></li>
            <li><a href="#" className="hover:underline">Discussions</a></li>
            <li><a href="#" className="hover:underline">Leaderboard</a></li>
          </ul>
        </div>

       
        <div className="mt-8">
          <h3 className="font-bold mb-3">LEGAL</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">API Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">DMCA Policy</a></li>
          </ul>
        </div>
      </div>


    </footer>
  );
}
