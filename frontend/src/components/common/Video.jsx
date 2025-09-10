

export default function Video({video ,activeVideo,setActiveVideo}){
    const isActive = activeVideo===video.key;
    return(
        <div className="relative w-[400px] flex-shrink-0" onClick={()=>setActiveVideo(video.key)}>
            {isActive?(
                <iframe
                    src={`https://www.youtube.com/embed/${video.key}${ isActive? "?autoplay=1&mute=1":""}`}
                    // title={video.name || "video"}
                    className="absolute top-0 left-0 w-full h-full "
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
                
                ):(
                    <img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}alt={video.name}
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"/>
                )
            }
        </div>
    )
    
}