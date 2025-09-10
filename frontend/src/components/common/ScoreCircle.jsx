
const ScoreCircle=({score})=>{
    
    const color=score<7.0?"#eab308" :"#22c55e";

    return (
        <div className="relative font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800"
            style={{
                background: `conic-gradient(${color} ${score * 36}deg, #4b5563 0deg)`,
            }}
        >
             <div className="inset-[3px] rounded-full bg-gray-800 w-8 h-8 flex items-center justify-center">
                <span className=" inset-0 items-center justify-center font-nunito text-[12px] text-white">
                    {Math.round(score*10)}%
                </span>
            </div>
            
        </div>
    );
};

export default ScoreCircle;