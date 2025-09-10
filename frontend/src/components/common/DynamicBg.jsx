import { useState, useEffect } from "react";
import { getDownload } from "../../service/tmdbApi";

export default function DynamicBg({ bg_Url }) {
  const [color, setColor] = useState([0, 0, 0]);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";


  useEffect(() => {
    
        if(!bg_Url) return ;
        const fetchData=async()=>{
          
           try{
            
            const data= await getDownload(bg_Url);
            setColor(data.DarkMuted);
                
           }catch(err){
            console.error(err);
           }
        }
        fetchData();
        
  }, [bg_Url]);


    useEffect(() => {
    console.log("Color updated:", color);
  }, [color]);
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      {bg_Url && (
        <img
          src={`${IMAGE_BASE}${bg_Url}`}
          alt="backdrop"
          className=" w-full h-full object-cover blur-[1px] bg-cover bg-center"
        />
      )}
      <div
        className="absolute inset-0  opacity-80"
        style={{
            backgroundColor: color ? `rgb(${color[0]},${color[1]},${color[2]})`: "transparent",
            
        }}
      />
    </div>
  );
}
