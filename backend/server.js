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

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
