import fetch from "node-fetch";
import { TMDB_AUTH } from "../config/env.js";

const headers ={
    accept:'application/json',
    Authorization:`${TMDB_AUTH}`
};

export async function fetchFromTMDB(endpoint) {
    const url=`https://api.themoviedb.org/3${endpoint}`;
    const res= await fetch(url,{method:'GET',headers});
    console.log({TMDB_AUTH});
    if(!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
    return res.json();
    
    
}

export async function getFile(endpoint) {
    const url=`https://image.tmdb.org/t/p/w300${endpoint}`;
    const res=await fetch(url,{method:'GET'});
    if(!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
    return res;
}