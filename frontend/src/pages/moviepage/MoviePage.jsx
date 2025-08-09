import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";

const MoviePage=()=>{
    const {id}=useParams();
    const[movie,setMovie]=useState(null);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
    const [cast,setCast]=useState([]);


    useEffect(()=>{

        const fetchMovie = async()=>{
        
        try{
            const res = await fetch(`http://localhost:5000/api/movie_id?id=${id}`);
            const data= await res.json();
            setMovie(data);

            const castRes= await fetch(`http://localhost:5000/api/credit?id=${id}`)
            const castData=await castRes.json();
            setCast(castData.cast);
            
        }
        catch(err){
                console.error("Failed to fetch movies or cast",err);
            }
        }
        if (id) fetchMovie();
    },[id]);

    if (!movie) return <div className="text-white text-2xl p-10">Loading...</div>;

    return (
        <div className="relative w-full min-h-screen bg-gray-900 text-white">
        
            <div className="absolute inset-0 bg-cover bg-center opacity-30"style={{ backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})` }}></div>

            <div className="relative z-10 flex flex-col gap-8 p-8 max-w-6xl mx-auto">
            
                <div className="flex flex-col md:flex-row gap-8">

                    <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} className="w-64 rounded-lg shadow-lg"/>
                   
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                        <p className="text-gray-300 italic">"{movie.tagline}"</p>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres?.map((g) => (
                                <span key={g.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">{g.name}</span>
                            ))}
                        </div>

                        <p className="text-gray-200">{movie.overview}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                            <div>
                                <p>
                                    <span className="font-semibold">Release Date:</span>{" "}
                                    {movie.release_date}
                                </p>

                                <p>
                                    <span className="font-semibold">Runtime:</span>{" "}
                                    {movie.runtime} min
                                </p>

                                <p>
                                    <span className="font-semibold">Rating:</span> ⭐{" "}
                                    {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                                </p>

                                <p>
                                    <span className="font-semibold">Popularity:</span>{" "}
                                    {movie.popularity}
                                </p>

                                <p>
                                    <span className="font-semibold">Status:</span>{" "}
                                    {movie.status}
                                </p>

                            </div>

                            <div>
                                <p>
                                    <span className="font-semibold">Language:</span>{" "}
                                    {movie.original_language}
                                </p>

                                <p>
                                    <span className="font-semibold">Spoken Languages:</span>{" "} {movie.spoken_languages ?.map((lang) => lang.english_name).join(", ")}
                                </p>

                                <p>
                                    <span className="font-semibold">Country:</span>{" "} {movie.production_countries ?.map((c) => c.name).join(", ")}
                                </p>

                                <p>
                                    <span className="font-semibold">IMDb:</span>{" "}
                                    <a href={`https://www.imdb.com/title/${movie.imdb_id}`} className="text-blue-400 underline" target="_blank" rel="noreferrer">{movie.imdb_id}</a>
                                </p>

                                <p>
                                    <span className="font-semibold">Homepage:</span>{" "}
                                    <a href={movie.homepage} className="text-blue-400 underline" target="_blank" rel="noreferrer"> {movie.homepage}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                    <div className="flex flex-wrap gap-6">
                        {movie.production_companies?.map((company, index) => (
                            <div key={index} className="bg-gray-800 p-3 rounded-lg flex items-center space-x-3">
                                {company.logo_path ? (
                                    <img src={`${IMAGE_BASE}${company.logo_path}`} alt={company.name} className="h-10"/>
                                ) : (
                                    <div className="w-10 h-10 bg-gray-600 flex items-center justify-center text-sm rounded">N/A</div>
                                )}
                                <span>{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {cast.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-4">Top Cast</h2>
                        <div className="overflow-x-auto">
                        <div className="flex gap-4 pb-4">
                            {cast.map((actor) => (
                            <div
                                key={actor.id}
                                className="bg-gray-800 min-w-[150px] max-w-[150px] rounded-lg p-3 text-center shadow-md flex-shrink-0"
                            >
                                <img
                                src={
                                    actor.profile_path
                                    ? `${IMAGE_BASE}${actor.profile_path}`
                                    : "https://via.placeholder.com/150x220?text=No+Image"
                                }
                                alt={actor.name}
                                className="w-full h-52 object-cover rounded mb-2"
                                />
                                <h4 className="font-semibold text-sm">{actor.name}</h4>
                                <p className="text-xs text-gray-400">as {actor.character}</p>
                            </div>
                            ))}
                        </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default MoviePage;