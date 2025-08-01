import { useState,useEffect,useRef } from "react";
import dayjs from "dayjs";


const Trending =()=>{
    const scrollRef=useRef(null);
    const [hide,setHide]=useState(false);
    const[movies,setMovies]=useState([]);
    const[active,setActive]=useState("today");
    // const [loading,setLoading] = useState(false);   
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


        const fetchData= async()=>{

            try{

                var api_url=``;
                if(active==="today"){
                    api_url=`http://localhost:5000/api/trending_day`;
                } else if(active==="week"){
                    api_url=`http://localhost:5000/api/trending_week`
                }
                const res = await fetch(api_url);
                const data= await res.json();
                setMovies(data.results);
            }
            catch(err){
                console.error("Failed to fetch movies",err);
            }
        };
        fetchData();
    },[active]);


    return(
        <div className="pt-5 w-5/6 relative">

            <div className="w-72 h-10 flex flex-row gap-4">
                <h3 className="text-2xl flex font-semibold items-center">Trending</h3>
                <label className=" relative flex items-center cursor-pointer">
                    <div className=" flex group peer bg-white rounded-full duration-300 w-full h-7 ring-1 ring-blue-950">
                        <button onClick={()=>setActive("today")}className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="today"?" bg-[#042c46] text-teal-400":"bg-white text-black"}`}>Today</button>
                        <button onClick={()=>setActive("week")} className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="week"?" bg-[#042c46] text-teal-400":"bg-white text-black"}`}>This week</button>
                    </div>
                </label>
            </div>
            <div ref={scrollRef} className=" mt-4 flex gap-3 overflow-x-auto w-full h-full  ">
                {
                    
                    movies.map((movie)=>(
                        <div key={movie.id} className=" min-w-40">
                            <img src={`${IMAGE_BASE}${movie.poster_path}`} alt ={movie.title} className="rounded-xl w-[150px] h-60 object-cover shadow-lg transition-transform "/>

                            <div className=" relative w-5/6 h-fit ml-2">
                                <div className="absolute -top-12 left-0 bg-black text-white font-bold w-10 h-10 flex items-center justify-center rounded-full border-3 " style={{
                                    background: `conic-gradient(#22c55e ${movie.vote_average * 36}deg, #222 0deg)`,
                                }}>
                                    {Math.round(movie.vote_average*10)}%
                                </div>
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