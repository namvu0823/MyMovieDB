import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({variant="default"}){
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
        <form className="rounded-sm relative " onSubmit={handleSubmit}>
            {variant==="header"&&(<FiSearch className="text-blue-950 text-xl cursor-pointer absolute top-4 ml-4 "/>)}
            <input id=" inner_search" type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} spellCheck="false" className ={` w-full h-12 px-5 bg-white rounded-3xl focus:outline-none ${variant==="header" ? "italic placeholder:text-gray-400 text-[16px] ml-6":" placeholder:text-gray-700 text-[18px]"}`} placeholder="Search for a movie, tv show, person......"></input>
            {variant!=="header"&&(
                <button class=" absolute top-1/2 right-[2px] -translate-y-1/2  h-11 w-24 bg-gradient-to-r from-teal-300 to-cyan-500 rounded-full shadow text-[18px] text-white hover:text-black "> Search</button>
            )}
        </form>
    )

}