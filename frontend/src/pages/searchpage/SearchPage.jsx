import React,{ useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";

function useQuery(){
    return new URLSearchParams(useLocation().search);
}
export  default function SearchPage(){
    const keyword=useQuery().get("q");
    const page=useQuery().get("page");
    const [loading,setLoading]=useState(false);
    const [activeCategory, setActiveCategory] = useState("movies");
    const [categories, setCategories] = useState({});
    const [data,setData]=useState(null);

    useEffect(()=>{
        if(!keyword) return;
        setLoading(true);
        console.log("keyword = ",keyword);
        const fetchMovie=async()=>{
            try{
                const res= await fetch(`http://localhost:5000/api/search?keyword=${keyword}`);
                const data=await res.json();
                setData(data);

                if (data.results) {
                    const counts = data.results.reduce((acc, item) => {
                    const type = item.media_type;
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                }, {});
                setCategories(counts);
}

            }catch(err){
                console.error("Failed to fetch movie by keyword",err);
            }
            finally{
                setLoading(false);
            }
        }

        if(keyword) fetchMovie();
    },[keyword]);

    if(loading)return <p className="p-4">Loading...</p>;
    return (
        <div className="flex flex-col w-full h-full ">
            <Header />
            <div className="flex py-8 gap-8 px-24">
                <div className="w-64">
                    <div className="bg-cyan-500 text-white font-bold text-lg px-4 py-2 rounded-t">
                        Search Results
                    </div>
                        <div className="border border-gray-200 rounded-b overflow-hidden">
                            <ul>
                                <li
                                className={`flex justify-between items-center px-4 py-2 cursor-pointer ${
                                    activeCategory === "all"
                                    ? "bg-gray-100 font-bold"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => setActiveCategory("all")}
                                >
                                <span>All</span>
                                <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">
                                    {data?.results?.length || 0}
                                </span>
                                </li>

                                {Object.entries(categories).map(([type, count]) => (
                                <li
                                    key={type}
                                    className={`flex justify-between items-center px-4 py-2 cursor-pointer ${
                                    activeCategory === type
                                        ? "bg-gray-100 font-bold"
                                        : "hover:bg-gray-50"
                                    }`}
                                    onClick={() => setActiveCategory(type)}
                                >
                                    <span className="capitalize">
                                    {type === "movie"
                                        ? "Movies"
                                        : type === "tv"
                                        ? "TV Shows"
                                        : type === "person"
                                        ? "People"
                                        : type}
                                    </span>
                                    <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">
                                    {count}
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                <div className="flex-1 space-y-4">
                    {data?.results && data.results.length > 0 ? (
                        data.results.map((item, i) => {
                        const title = item.title || item.name || "Untitled";
                        const date = item.release_date || item.first_air_date || null;
                        const poster = item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : null;

                        return (
                            <div
                            key={i}
                            className="flex bg-white rounded-lg shadow p-4 gap-4 items-start"
                            >
                            {poster ? (
                                <img
                                src={poster}
                                alt={title}
                                className="w-28 h-40 object-cover rounded"
                                />
                            ) : (
                                <div className="w-28 h-40 flex items-center justify-center bg-gray-200 rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                                    />
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7l7.89 5.26a2 2 0 002.22 0L21 7M16 11h.01M12 13.5l-3.5 4.5h7l-3.5-4.5z"
                                    />
                                </svg>
                                </div>
                            )}

                            <div>
                                <h3 className="font-bold text-lg">{title}</h3>
                                <p className="text-gray-500 text-sm mb-2">
                                {date ? new Date(date).toLocaleDateString() : ""}
                                </p>
                                {item.overview && (
                                <p className="text-gray-700">{item.overview}</p>
                                )}
                            </div>
                            </div>
                        );
                        })
                    ) : (
                        <p className="text-gray-500">No results found for: {keyword}</p>
                    )}
                </div>
            </div>

        </div>
    );
}