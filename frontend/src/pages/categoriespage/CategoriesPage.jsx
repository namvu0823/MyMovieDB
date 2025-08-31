import React,{useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import ScoreCircle from"../../components/common/ScoreCircle";
import Pagination from "../../components/pagination/Pagination";
import Header from "../../components/header/Header";



export default function CategoriesPage(){
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const navigate=useNavigate();

  const type=queryParams.get("type");
  const category=queryParams.get("category");
  const page=parseInt(queryParams.get("page")) || 1;

  const [data,setData]=useState([]);
  const [loanding,setLoading]=useState(true);
  const [totalPages, setTotalPages]=useState(1);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  

  useEffect(()=>{
    if(!type||!category) return;
    setLoading(true);
    const fetchData=async()=>{
      try{
        const res= await fetch(`http://localhost:5000/api/type_cate?type=${type}&category=${category}&page=${page||1}`);
        const data= await res.json();
        setData(data);
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
      <Header/>
      <div className="w-full h-full p-6">
        <h1 className="text-2xl font-bold mb-6">
          {type?.toUpperCase()} - {category?.replace("_", " ").toUpperCase()}
        </h1>
        <div className="grid grid-cols-5 gap-6">
          {data.results.map((item) => (
          <div
              key={item.id}
              className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              onClick={()=>navigate(`/movie/${item.id}`)}
            >
              <img
                src={
                  item.poster_path
                    ? `${IMAGE_BASE}${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-3">
                {item.vote_average ? (
                  <div className="absolute bottom-11 left-3">
                    <ScoreCircle score={item.vote_average} />
                  </div>
                ) : null}
                <h2 className="font-semibold truncate">{item.title || item.name}</h2>
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
  );
}

