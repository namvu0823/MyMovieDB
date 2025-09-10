import { useState,useEffect } from "react"
import { getKeyword } from "../../service/tmdbApi";

export default function Keyword({id}){
    const [keyword,setKeyword]=useState([]);

    useEffect(()=>{
        const getData=async(req,res)=>{
            try{
                const data= await getKeyword(id);
                setKeyword(data.keywords);
            }catch(err){
            
                console.error("Failed to fetch movies or cast",err);
            
            }
        }
        getData();
    },[id]);

    return(
        <div className="w-full h-fit flex flex-wrap gap-2">
            {
                keyword.map((item)=>(
                    <span key={item.id} className="w-fit h-fit p-1 text-[13px] bg-gray-100 text-black text-justify rounded-md border-gray-300 border-[1px]" >{item.name}</span>
                ))
            }
        </div>
    )
}