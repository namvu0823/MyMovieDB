import React,{useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { getGenre,getType_Catergory } from "../../service/tmdbApi";
import Loading from "../../components/common/Loading";
import ScoreCircle from"../../components/common/ScoreCircle";
import Pagination from "../../components/common/Pagination";




export default function CategoriesPage(){
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const navigate=useNavigate();

  const type=queryParams.get("type");
  const category=queryParams.get("category");
  const page=parseInt(queryParams.get("page")) || 1;

  const [data,setData]=useState([]);
  const [genre,setGenre]=useState([])
  const [loanding,setLoading]=useState(true);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  

  useEffect(()=>{
    if(!type||!category) return;
    setLoading(true);
    const fetchData=async()=>{
      try{
        const data= await getType_Catergory(type,category,page);
        setData(data);

        const data1=await getGenre(type);
        setGenre(data1.genres);
      }catch(err){
        console.error(err,"Failed to fetch with type and category");
      }finally{
        setLoading(false);
      }
    }
    if(type&&category) fetchData();
  },[type,category,page]);

  if (loanding) return<Loading/>;
   return (
    <div className="w-full h-full">
    
      <h1 className="text-2xl font-medium my-6 ml-16 ">
            {type?.toUpperCase()} : {category?.replace("_", " ").toUpperCase()}

      </h1>
      <div className="w-full h-full flex flex-row px-16">

        <div className="w-96 h-full border border-gray-200 rounded-xl shadow-xl px-6  self-start">
          <h3 className=" text-black my-4 text-xl"> Genres</h3>
          <div className="w-ful h-fit flex flex-wrap gap-3 pb-6">
            {genre.map((item)=>(
              <span 
                key={item.id}
                className="px-4 py-2 border border-gray-400 rounded-full text-gray-800 hover:text-white text-sm cursor-pointer hover:bg-sky-400 transition"
              >
                {item.name}
              </span>
            ))}

          </div>
        </div>

        <div className="w-fit h-full px-6 mb-6">
          
          <div className="grid grid-cols-5 gap-6">
            {data.results.map((item) => (
            <div
                key={item.id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                onClick={()=>navigate(`/movie/${item.id}`)}
              >
                <img
                  src={
                    item.poster_path
                      ? `${IMAGE_BASE}${item.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={item.title || item.name}
                  className="w-full h-[273 px] object-cover"
                />
                <div className=" relative p-3">
                  {item.vote_average ? (
                    <div className="absolute -top-5 left-3">
                      <ScoreCircle score={item.vote_average} />
                    </div>
                  ) : null}
                  <h2 className="font-semibold truncate mt-3">{item.title || item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.release_date || item.first_air_date}
                  </p>
                </div>
              </div>

            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            basePath="/categories"
            query={{ type, category }}
          />
        </div>
      </div>
      
    </div>
  );
}

