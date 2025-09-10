import { fetchFromTMDB } from "../services/tmdb.js";

export const getTvEp_Upcoming=async(req,res)=>{
    try{
        const data =await fetchFromTMDB(`/tv/airing_today?language=en-US&page=1`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to fetch trending movie day"});
    }

}