import { fetchFromTMDB } from "../services/tmdb.js";

export const getTrendingDay= async(req,res)=>{

    try{
        const data =await fetchFromTMDB(`/trending/movie/day?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch trending movie day"});
    }
};

export const getTrendingWeek =async(req,res)=>{
    try{
        const data= await fetchFromTMDB(`/trending/movie/week?language=en-US`);
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch trending movie week"})
    }
};

export const getPopular=async(req,res)=>{
    try{
        const data =await fetchFromTMDB(`/movie/popular?language=en-US`)
        res.json(data);

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch trending movie week"});
    }

};

export const getUpcoming=async(req,res)=>{
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

export const getCredit=async(req,res)=>{
    try{
        const id =req.query.id;
        const data = await fetchFromTMDB(`/movie/${id}/credits?language=en-US`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch credit movie by id"})
    }
};


export const search_keyword=async(req,res)=>{
    try{
        const keyword=req.query.keyword;
        const page=req.query.page;
        const data=await fetchFromTMDB(`/search/multi?query=${keyword}&page=${page}`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch with keyword"})
    }
};

export const getType=async(req,res)=>{
    try{
        const type=req.query.type;
        const category=req.query.category;
        const page=req.query.page;

        const data=await fetchFromTMDB(`/${type}/${category}?language=en-US&page=${page}`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch wwith type and category"});
    }
}