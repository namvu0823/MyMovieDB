import { useState,useEffect,useRef } from "react";
import { getMovieRecommend } from "../../service/tmdbApi";

export default function Recommendation({id}){
    const scrollRef=useRef(null);
    const [hide,setHide]=useState(false);
    const [recommend,setRecommend]=useState([]);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

    useEffect(()=>{

        const getRecommend= async(req,res)=>{
            const data=await getMovieRecommend(id);
            setRecommend(data.results);
        }
        getRecommend();
    },[id])

    useEffect(()=>{
        const el=scrollRef.current;
        if(!el|| recommend.length === 0)return;

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
    },[id]);

    return(

        <div className=" w-full h-fit relative  flex-col">
            <h2 className="text-xl font-bold mb-4 text-black">Recommendations</h2>   

            <div ref={scrollRef} className="  mt-4 flex gap-4 overflow-x-auto  w-full h-[290px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent ">
               
                {recommend.map((item) => (
                <div
                    key={item.id}
                    className=" w-[250px] h-fit  text-left flex-shrink-0"
                >
                    <img
                        src={item.backdrop_path? `${IMAGE_BASE}${item.backdrop_path}`: "https://via.placeholder.com/150x220?text=No+Image"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <div className=" relative w-full h-5  flex flex-row justify-between">
                        <h4 className=" font-normal text-sm text-black  truncate overflow-hidden whitespace-nowrap">{item.title}</h4>
                        <h4 className=" font-normal text-sm text-black ">{Math.round(item.vote_average*10)}%</h4>
                    </div>
                    
                </div>
                ))}
            </div>
  
           {!hide&&(<div className="pointer-events-none w-16  h-full absolute right-0 top-0 bg-gradient-to-l from-white to-transparent "></div>)}
        </div>
    );

}

