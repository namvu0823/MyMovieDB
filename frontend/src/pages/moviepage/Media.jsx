import { getMovieMedia } from "../../service/tmdbApi";
import { useState,useEffect } from "react";
import Video from "../../components/common/Video";

export default function Media({id}){
    
    const [type,setType]=useState("images");
    const [typeImg,setTypeImg]=useState("backdrops")
    const [media,setMedia]=useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [click_tab,setClick_tab]=useState(1);
    
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

    useEffect(()=>{

        const getMedia= async(req,res)=>{
            try{
                const data=await getMovieMedia(id,type);
                if(type==="images"){
                    if(typeImg==="posters"){
                        setMedia(data.posters)
                    }else if(typeImg==="backdrops"){
                        setMedia(data.backdrops);
                    }else if(typeImg==="popular"){
                        setMedia(data.backdrops.filter(bd=>bd.vote_count>0).sort((a,b)=>b.vote_count-a.vote_count||b.vote_average-a.vote_average));
                    }
                }else{
                    setMedia(data.results.slice(0,5));
                }
            }
            catch(err){
                console.error("Failed to fetch movies or cast",err);
            }
        }

        getMedia();

    },[id,type,typeImg])

    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row gap-10 items-baseline ">
                <h2 className="text-xl font-bold mb-4 text-black pr-3 ">Media</h2>
                <h3 onClick={()=>{setType("images") ; setTypeImg("popular");setClick_tab(1);}} className={`text-md font-semibold text-black hover:underline cursor-pointer ${click_tab===1?"underline":""}`}>Most popular</h3>
                <h3 onClick={()=>{setType("videos");setClick_tab(2)}} className={`text-md font-semibold text-black hover:underline cursor-pointer ${click_tab===2?"underline":""}`}>Video</h3>
                <h3 onClick={()=>{setType("images"); setTypeImg("backdrops");setClick_tab(3)}}className={`text-md font-semibold text-black hover:underline cursor-pointer ${click_tab===3?"underline":""}`}>Backdrop</h3>
                <h3 onClick={()=>{setType("images"); setTypeImg("posters");setClick_tab(4)}}className={`text-md font-semibold text-black hover:underline cursor-pointer ${click_tab===4?"underline":""}`}>Poster</h3>
            </div>

            <div className="w-full h-96 flex flex-row overflow-x-auto bg-slate-600">
                { 
                    type==="images"?
                    (media.map((md)=>(
                    
                        <img key={md.file_path} src={`${IMAGE_BASE}${md.file_path}`} className="h-full object-contain"/>//ảnh đúng tỷ lệ
                     
                    )))
                     
                    :(
                        media.map((vd)=>(
                            <Video key={vd.key} video={vd} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
                        ))
                    )
                }
            </div>

        </div>
    )
}