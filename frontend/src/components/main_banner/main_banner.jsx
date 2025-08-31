
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
                <h3 class=" text-white text-3xl  font-semibold z-10 mb-14">Millions of movies, TV shows and people to discover. Explore now.</h3>
                
                <SearchBar/>
            
            </div>
        </div>

    );
}

export default Main_Banner;