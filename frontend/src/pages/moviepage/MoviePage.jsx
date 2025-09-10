import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import DynamicBg from "../../components/common/DynamicBg";
import ScoreCircle from "../../components/common/ScoreCircle";
import Scrollitem from "../../components/common/Scrollitem";
import {FiList,FiHeart,FiBookmark} from "react-icons/fi";
import { getMovieById,getMovieCredits,getMovieCertification } from "../../service/tmdbApi";
import Media from "./Media";
import Recommendation from "./Recommendation";
import Keyword from "./Keyword";

const MoviePage=()=>{
    const {id}=useParams();
    const[movie,setMovie]=useState(null);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
    let [cast,setCast]=useState([]);
    const [director,setDirector]=useState([]);
    const [writer,setWriter]=useState([]);
    const [rate,setRate]=useState([]);


    useEffect(()=>{

        const fetchMovie = async()=>{
        
            try{
                const data = await getMovieById(id);
                setMovie(data);

                const castData= await getMovieCredits(id);
                setCast(castData.cast);
                setDirector(castData.crew.filter(item=>item.department==="Directing"));
                setWriter(castData.crew.filter(item=>item.department==="Writing"));


                const Rdata=await getMovieCertification(id);
                const Rdata1=Rdata.results.find(item=>item.iso_3166_1==="US");
                setRate(Rdata1.release_dates.find(item=>item.type===2||item.type===4));
                
            }
            catch(err){
                console.error("Failed to fetch movies or cast",err);
            }
        }
        if (id) fetchMovie();
    },[id]);

  

    if (!movie) return <div className="text-white text-2xl p-10">Loading...</div>;

    return (
        <div className="w-full h-full">
           
            
            <div className=" w-full min-h-screen  text-white">
               
                
                <div className=" flex flex-col gap-8  w-full mx-auto">
                
                    <div className="relative w-full h-[510px]">
                        <div className=" absolute inset-0 z-0">
                            <DynamicBg bg_Url={`${movie.backdrop_path}`} />
                        </div>

                        <div className=" absolute z-10 w-full flex flex-col md:flex-row px-24 p-8 gap-10 inset-0 bg-cover bg-center ">

                            <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} className="w-[300px] rounded-lg shadow-lg"/>
                        
                            <div className="flex-1 space-y-5 pt-4">
                                <div className="flex flex-row gap-2">
                                    <p className="text-4xl font-bold w-fit">{movie.title} </p>
                                    <p className="text-4xl font-normal w-fit text-gray-300 "> ({movie.release_date.substring(0,4)})</p>
                                </div>

                                <div className="flex flex-row gap-2 ">
                                    <button className=" w-fit h-6 px-1 rounded-sm border-gray-300 border-[1px] flex justify-center items-center text-gray-300 opacity-80">{rate?.certification}</button>
                                    <p className="w-fit font-sans font-light ">{movie? new Date(movie.release_date).toLocaleDateString("en-US", {day: "2-digit",month: "2-digit",year: "numeric"}):""} ({movie.origin_country[0]})</p>
                                    
                                    <div className="w-fit h-6 flex justify-center items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-fit">
                                        {movie.genres?.map((g) => (
                                            <span key={g.id} className=" px-2 w-fit h-6 rounded-full border-gray-200 border-[1px] text-sm flex items-center justify-center">{g.name}</span>
                                        ))}
                                    </div>
                                    <div className="w-fit h-6 flex justify-center items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5"></span>
                                    </div>
                                   
                                    <p className="w-fit">{movie.runtime}m</p>
                                </div>

                                <div className="flex flex-row gap-4">
                                    <div className="scale-150 w-fit pl-2"><ScoreCircle score={movie.vote_average}/></div>
                                    <div className=" flex flex-col w-fit text-sm font-semibold">
                                        <span>User</span>
                                        <span>Score</span>
                                    </div>
                                </div>
                        
                                <div className="flex flex-row gap-5">
                                    <div className="bg-sky-950 w-12 h-12 flex items-center justify-center rounded-full">
                                        <FiList size={20} color="white" />
                                    </div>
                                    <div className="bg-sky-950 w-12 h-12 flex items-center justify-center rounded-full">
                                        <FiHeart size={20} color="white" />
                                    </div>
                                    <div className="bg-sky-950 w-12 h-12 flex items-center justify-center rounded-full">
                                        <FiBookmark size={20} color="white" />
                                    </div>
                                </div>

                                
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-gray-300 italic w-full">{movie.tagline}</p>
                                    <p className="text-xl font-normal">Overview</p>
                                    <p className="text-gray-200 w-full">{movie.overview}</p>
                                </div>
                          
                                <div className="flex flex-row gap-64">
                                    <div className="flex flex-col gap-1 w-fit ">
                                        { director?.[0]&&(
                                           <span key={director[0].id} className=" py-1 font-bold text-sm"> {director[0].name}</span>
                                        )}
                                        <span className="flex ">Director</span>
                                    </div>
                                    <div className="flex flex-col gap-1 w-fit">
                                        {writer?.[0]&&(
                                           <span key={writer[0].id} className=" py-1 font-bold text-sm"> {writer[0].name}</span>
                                        )}
                                        <span className="flex ">Story</span>
                                    
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>


                    <div className="flex flex-row gap-10 px-20">

                        <div className="w-[75%] flex flex-col gap-4">
                            <Scrollitem cast={cast.slice(0,20)}/>
                            <h2 className="text-md font-semibold mb-4 text-black hover:text-gray-700 hover:underline">Full Cast & Crew</h2>
                            <hr className="w-full  bg-black  "></hr>
                            <Media id={id}/>
                            <hr className="w-full  bg-black  "></hr>
                            <Recommendation id={id}/>
                            
                        </div>
                       
                        <div className="w-25% flex flex-col gap-6 pt-28">
                            <h2 className="text-md font-semibold  text-black">Production Companies</h2>
                            <div className="flex flex-wrap gap-4">
                                {movie.production_companies?.map((company, index) => (
                                    <div key={index} className="bg-white gap-2 rounded-lg flex items-center space-x-1">
                                        {company.logo_path ? (
                                            <img src={`${IMAGE_BASE}${company.logo_path}`} alt={company.name} className="h-10 max-w-28 p-2 rounded-sm border-[1px] border-gray-600"/>
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-600 flex items-center justify-center text-sm rounded">N/A</div>
                                        )}
                                        
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-fit flex flex-col gap-2"> 
                                <h2 className="text-black font-semibold text-md">Status</h2>
                                <h3 className="text-gray-700 font-normal text-md">{movie.status}</h3>
                            </div>

                            <div className="w-full h-fit flex flex-col gap-2"> 
                                <h2 className="text-black font-semibold text-md">Original Language</h2>
                                <h3 className="text-gray-700 font-normal text-md">{new Intl.DisplayNames(["en"],{type:"language"}).of(movie.original_language)}</h3>
                            </div>
                            <div className="w-full h-fit flex flex-col gap-2"> 
                                <h2 className="text-black font-semibold text-md">Budget</h2>
                                <h3 className="text-gray-700 font-normal text-md">${(movie.budget).toLocaleString("en-US")}</h3>
                            </div>
                            <div className="w-full h-fit flex flex-col gap-2"> 
                                <h2 className="text-black font-semibold text-md">Revenue</h2>
                                <h3 className="text-gray-700 font-normal text-md">${(movie.revenue).toLocaleString("en-US")}</h3>
                            </div>
                            <div className="w-full h-fit flex flex-col gap-2"> 
                                <h2 className="text-black font-semibold text-md">Keywords</h2>
                                <div>
                                    <Keyword id={id}/>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;