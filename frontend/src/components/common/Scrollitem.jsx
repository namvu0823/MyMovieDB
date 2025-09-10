import { useState,useEffect,useRef } from "react";

export default function Scrollitem({cast}){
    const scrollRef=useRef(null);
    const [hide,setHide]=useState(false);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

    useEffect(()=>{
        const el=scrollRef.current;
        if(!el|| cast.length === 0)return;

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
    },[cast]);

    return(

        <div className=" w-full h-fit relative  flex-col">
            <h2 className="text-xl font-bold mb-4 text-black">Top Billed Cast</h2>   

            <div ref={scrollRef} className="  mt-4 flex gap-2 overflow-x-auto  w-full h-[315px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent ">
               
                {cast.map((actor) => (
                <div
                    key={actor.id}
                    className="bg-white w-[140px] h-fit rounded-lg text-left shadow-md flex-shrink-0"
                >
                    <img
                        src={actor.profile_path? `${IMAGE_BASE}${actor.profile_path}`: "https://via.placeholder.com/150x220?text=No+Image"}
                        alt={actor.name}
                        className="w-full h-48 object-cover rounded-t-lg mb-2"
                    />
                    <div className="w-full h-20 pl-3">
                        <h4 className="font-bold text-sm text-black">{actor.name}</h4>
                        <p className="text-xs text-black">{actor.character}</p>
                    </div>
                    
                </div>
                ))}
            </div>
  
           {!hide&&(<div className="pointer-events-none w-16  h-full absolute right-0 top-0 bg-gradient-to-l from-white to-transparent "></div>)}
        </div>
    );

}

