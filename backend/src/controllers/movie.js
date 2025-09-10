import { fetchFromTMDB } from "../services/tmdb.js";


export const getMovieTrending= async(req,res)=>{
    const time=req.query.time;

    try{
        const data =await fetchFromTMDB(`/trending/movie/${time}?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch trending movie day"});
    }
};

export const getMovieUpcoming=async(req,res)=>{
    try{
        const data=await fetchFromTMDB(`/movie/upcoming?language=en-US&page=1`);
        const results =await Promise.all(
            data.results.map(async(movie)=>{
                const vd_data=await fetchFromTMDB(`/movie/${movie.id}/videos?language=en-US`);
                const trailer=vd_data.results.find(v=>v.type==="Trailer"&&v.site==="YouTube");

                return{
                    id:movie.id,
                    title:movie.title,
                    release_date:movie.release_date,
                    poster_path:movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    trailerKey:trailer?trailer.key:null,
                    trailerUrl:trailer?`https://www.youtube.com/watch?v=${trailer.key}` : null
                };
            })
        );
        res.json({results});
    }

    catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch upcoming movies"});
    }
};

export const getMovieById=async(req,res)=>{
    try{
        const id =req.query.id;
        const data=await fetchFromTMDB(`/movie/${id}?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch movie by ID"});
    }
};

export const getMovieCredit=async(req,res)=>{
    try{
        const id =req.query.id;
        const data = await fetchFromTMDB(`/movie/${id}/credits?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch credit movie by id"})
    }
};

export const getMovieCertification =async(req,res)=>{
    try{
        const id =req.query.id;
        const data = await fetchFromTMDB(`/movie/${id}/release_dates?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch credit movie by id"})
    }
}

export const getMovieMedia =async(req,res)=>{
    try{
        const id=req.query.id;
        const mediaType= req.query.mediaType;
        const data = await fetchFromTMDB(`/movie/${id}/${mediaType}`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch movie media"})
    }
}

export const getMovieRecommendation =async(req,res)=>{
    try{
        const id=req.query.id;
        const data = await fetchFromTMDB(`/movie/${id}/recommendations?language=en-US&page=1`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch recommendation"})
    }
}
export const getMovieKeyword=async(req,res)=>{
    try{
        const id=req.query.id;
        const data = await fetchFromTMDB(`/movie/${id}/keywords?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch recommendation"})
    }
}