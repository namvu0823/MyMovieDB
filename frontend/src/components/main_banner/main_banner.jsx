
import { useState ,useEffect} from "react";
import SearchBar from "../common/SearchBar";
const Main_Banner=()=>{

    const [movie,setMovie]=useState([]);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res=await fetch(`http://localhost:5000/api/trending_day`);
                const data=await res.json();
                const random_Movie=data.results[Math.floor(Math.random()*data.results.length)];
                setMovie(random_Movie);
            }
            catch(err){
                console.error("Failed to fetch trending",err);
            }
        }

        fetchData();
    },[]);

    return (
        <div className="relative w-full h-full">
            <img src={`${IMAGE_BASE}${movie.backdrop_path}`} class="w-full h-full object-cover object-center brightness-125 "/>
            <div class="absolute inset-0 bg-[#042c46] opacity-60 z-0"></div>

            <div class="absolute inset-0 px-40 pt-10">

                <h2 class=" text-white text-[45px]  font-bold z-10">Welcome.</h2>
                <h3 class=" text-white text-3xl  font-semibold z-10">Millions of movies, TV shows and people to discover. Explore now.</h3>
                {/* <div class=" mt-14 rounded-sm relative ">
                    <input id=" inner_search" type="text" spellCheck="false" class=" w-full h-12 px-5 text-[18px] bg-white rounded-3xl placeholder:text-gray-700 focus:outline-none " placeholder="Search for a movie, tv show, person......"></input>
                    <button class=" absolute top-1/2 right-[2px] -translate-y-1/2  h-11 w-24 bg-gradient-to-r from-teal-300 to-cyan-500 rounded-full shadow text-[18px] text-white hover:text-black "> Search</button>
                </div> */}
                <SearchBar/>
            
            </div>
        </div>

    );
}

export default Main_Banner;