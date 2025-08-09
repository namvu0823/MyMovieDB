import express from "express";
import fetch from "node-fetch";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;

app.use(cors());

app.get("/api/trending_day",async(req,res)=>{
   

    const url='https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };

    try{
        const response=await fetch (url,option);
        const data=await response.json();
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch trending movies" });
    }
});


app.get("/api/trending_week",async(req,res)=>{

    const url='https://api.themoviedb.org/3/trending/movie/week?language=en-US';
    const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };

    try{
        const response=await fetch(url,option);
        const data=await response.json();
        res.json(data);

    }catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch trending movie"});
    }
});

app.get("/api/upcoming",async(req,res)=>{
    const url='https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };

    try{
        const response=await fetch(url,option);
        const data=await response.json();
        const results=await Promise.all(
            data.results.map(async(movie)=>{
                const vd_url=`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;
                const vd_res= await fetch(vd_url,option);
                const vd_data= await vd_res.json();
                const trailer=vd_data.results.find(v=>v.type==="Trailer"&& v.site==="YouTube");

                
                return {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                trailerKey: trailer ? trailer.key : null,
                trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
                };
            })
        )

        res.json({results});

    }catch(err){
        console.error(err);
        res.status(500).json({er:"Failed to fetch upcoming movie"});
    }

    
});


app.get("/api/popular",async(req,res)=>{

    const url='https://api.themoviedb.org/3/movie/popular?language=en-US';
    const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };

    try{
        const response=await fetch(url,option);
        const data=await response.json();
        res.json(data);

    }catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch trending movie"});
    }
});

app.get("/api/movie_id",async(req,res)=>{
    const id=req.query.id;
    const url=`https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };
    try{
        const response=await fetch(url,option);
        const data= await response.json();
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch trending movie"});
    }
})

app.get("/api/credit",async(req,res)=>{
    const id=req.query.id;
    const url=`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

     const option={
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:`${process.env.TMDB_AUTH}`
        }
    };
    try{
        const response=await fetch(url,option);
        const data= await response.json();
        res.json(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:"Failed to fetch trending movie"});
    }

})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
