const ScoreCircle=({score})=>{
    return (
        <div className="absolute -top-12 left-0 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full border-2"
            style={{
                background: `conic-gradient(#22c55e ${score * 36}deg, #222 0deg)`,
            }}
        >
            {Math.round(score*10)}%

        </div>
    );
};

export default ScoreCircle;