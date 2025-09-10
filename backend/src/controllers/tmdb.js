import { fetchFromTMDB } from "../services/tmdb.js";

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

export const getType_Catergory=async(req,res)=>{
    try{
        const type=req.query.type;
        const catergory=req.query.catergory;
        const page=req.query.page;

        const data=await fetchFromTMDB(`/${type}/${catergory}?language=en-US&page=${page}`);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch with type and category"});
    }
}
export const getGenre=async(req,res)=>{
    try{
        const type=req.query.type;
        const data=await fetchFromTMDB(`/genre/${type}/list?language=en`);
        res.json(data);

    }catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to feth genre"});
    }
}
export const getImage=async(req,res)=>{
    try{
        const type=req.query.type;
        const id=req.query.id;

        const data= await fetchFromTMDB(`/${type}/${id}/images`);
        res.json(data);
    }
    catch(err){
        console.error(err,"Failed to fetch image");
    }
}
export const getPopular=async(req,res)=>{
    try{
        const type=req.query.type;
        const data= await fetchFromTMDB(`/${type}/popular?language=en-US`);
        res.json(data);
    }
    catch(err){
        console.error(err,"Failed to fetch image");
    }
}
