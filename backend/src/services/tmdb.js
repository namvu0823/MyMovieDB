import fetch from "node-fetch";
import { TMDB_AUTH } from "../config/env.js";

const headers ={
    accept:'application/json',
    Authorization:`${TMDB_AUTH}`
};

export async function fetchFromTMDB(endpoint) {
    const url=`https://api.themoviedb.org/3${endpoint}`;
    const res= await fetch(url,{method:'GET',headers});
    if(!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
    return res.json();
    
}