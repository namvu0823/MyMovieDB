import { useState,useEffect,useRef } from "react";


const Trailers=()=>{

    const[active,setActive]=useState("popular");
    const[trailers,setTrailers]=useState([]);
    const[backdrop,setBackdrop]=useState([]);
    const[run_trailer,setRun_trailer]=useState([]);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";



    useEffect(()=>{

        const fetchData=async()=>{
            try{
                var api_url=``;
                if(active==="popular") api_url=`http://localhost:5000/api/upcoming`;

                else if(active==="theaters") api_url=`http://localhost:5000/api/upcoming`;

                const res= await fetch(api_url);
                const data=await res.json();
                setTrailers(data.results);
                setBackdrop(data.results[0].backdrop_path)
            }
            catch(err){
                console.error("failed to fetch trailer",err);
            }
        }

        fetchData();
    },[active])

    return(
        <div className=" w-full h-full relative " style={{backgroundImage:`url(${IMAGE_BASE}${backdrop})`,backgroundSize: "cover",backgroundPosition: "center",transition: "background-image 0.5s ease" }}>

            <div className=" ml-32 w-96 h-10 flex flex-row gap-4 pt-11 ">
                <h3 className="ml-[1px] text-2xl text-white flex font-semibold items-center">Latest Trailers</h3>
                <label className=" relative flex items-center cursor-pointer">
                    <div className=" flex group peer rounded-full duration-300 w-full h-7 ring-1 bg-white ring-blue-950">
                        <button onClick={()=>setActive("popular")}className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="popular"?" bg-[#042c46] text-teal-400":"  text-black"}`}>Popular</button>
                        <button onClick={()=>setActive("theaters")} className={`px-4 py-1 font-medium text-sm transition-colors rounded-full ${active==="theaters"?" bg-[#042c46] text-teal-400":" text-black"}`}>In Theaters</button>
                    </div>
                </label>
            </div>

            <div className="w-full h-[342px] flex flex-row justify-center pt-11">
                <div className="w-[83%] h-full flex flex-row gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {trailers.map((trailer) => (
                        <div key={trailer.id} className="w-[300px] h-48 flex-shrink-0" onClick={()=>{setBackdrop(trailer.backdrop_path),setRun_trailer(trailer.id)}}>
                        
                        {
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.trailerKey}${run_trailer===trailer.id? '?autoplay=1':''}`}
                            title={trailer.title}
                            className="w-full h-full rounded-lg"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                        }
                        <h3 className="text-md font-bold text-white mt-2 text-center">{trailer.title}</h3>
                        </div>
                        
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Trailers