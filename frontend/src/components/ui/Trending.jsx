import { useState,useEffect,useRef } from "react";
import dayjs from "dayjs";
import ScoreCircle from "../common/ScoreCircle";
import { useNavigate } from "react-router-dom";
import {getMovieTrending} from "../../service/tmdbApi";
import Loading from "../common/Loading";


const Trending =()=>{
    const scrollRef=useRef(null);
    const [hide,setHide]=useState(false);
    const[movies,setMovies]=useState([]);
    const[active,setActive]=useState("day");
    const[loading,setLoading]=useState(false);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

    useEffect(()=>{
        const el=scrollRef.current;
        if(!el|| movies.length === 0)return;

        const handleScroll=()=>{
            if(el.scrollLeft+el.clientWidth>=el.scrollWidth-3){
                setHide(true);
            }
            else{
                setHide(false);
            }
        }
        el.addEventListener("scroll", handleScroll);
        handleScroll();

        return ()=>{
            el.removeEventListener("scroll",handleScroll);
        };
    },[movies]);

    

    useEffect(()=>{

        setLoading(true);
        const fetchData= async()=>{
            try{
                const data = await getMovieTrending(active);
                setMovies(data.results);
            }
            catch(err){
                console.error("Failed to fetch movies",err);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[active]);

    const navigate = useNavigate();

    if(loading) 
    return (
        <div className="w-full h-full">
            <Loading/>;
        </div>
    )
    return(
        <div className=" w-[83%] h-full relative  flex-col">

            <div className="w-72 h-10 my-5 flex flex-row gap-4">
                <h3 className="text-2xl flex font-semibold items-center">Trending</h3>
                <label className=" relative flex items-center cursor-pointer">
                    <div className=" flex group peer bg-white rounded-full duration-300 w-full h-7 ring-1 ring-blue-950">
                        <button onClick={()=>setActive("day")}className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="day"?" bg-[#042c46] text-teal-400":"bg-white text-black"}`}>Today</button>
                        <button onClick={()=>setActive("week")} className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="week"?" bg-[#042c46] text-teal-400":"bg-white text-black"}`}>This week</button>
                    </div>
                </label>
            </div>
            <div ref={scrollRef} className="  mt-4 flex gap-2 overflow-x-auto  w-full h-[374px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent ">
                {
                    
                    movies.map((movie)=>(
                        <div key={movie.id} className=" min-w-40 h-[]" onClick={()=>navigate(`/movie/${movie.id}`)}>
                            <img src={`${IMAGE_BASE}${movie.poster_path}`} alt ={movie.title} className="rounded-xl w-[150px] h-56 object-cover shadow-lg transition-transform "/>

                            <div className=" relative w-5/6 h-auto ml-2">
                                <div className="absolute -top-11 left-0"> <ScoreCircle score={movie.vote_average}/></div>
                                <h3 className="mt-7 text-[16px] font-bold leading-tight line-clamp-2 hover:text-sky-400">{movie.title}</h3>
                                <h3 className="mt-2 text-[16px] font-normal text-gray-500 ">{dayjs(movie.release_date).format("MMM DD, YYYY")}</h3>
                                
                            </div>
                           
                        </div>

                    ))
                }

            </div>

           {!hide&&(<div className="pointer-events-none w-28 h-full absolute right-0 top-0 bg-gradient-to-l from-white to-transparent "></div>)}
        </div>
    );

}

export default Trending;