import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar(){
    const[keyword,setKeyword]=useState("");
    const navigate=useNavigate();

    const handleSearch=()=>{
        if(!keyword.trim())return;
        navigate(`/search?q=${encodeURIComponent(keyword)}`);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleSearch();

    };

    return(
        <form className=" mt-14 rounded-sm relative " onSubmit={handleSubmit}>
            <input id=" inner_search" type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} spellCheck="false" class=" w-full h-12 px-5 text-[18px] bg-white rounded-3xl placeholder:text-gray-700 focus:outline-none " placeholder="Search for a movie, tv show, person......"></input>
            <button class=" absolute top-1/2 right-[2px] -translate-y-1/2  h-11 w-24 bg-gradient-to-r from-teal-300 to-cyan-500 rounded-full shadow text-[18px] text-white hover:text-black "> Search</button>
        </form>
    )

}