import  api from "./api";

export const getMovieById = (id) => api.get(`/mv_id?id=${id}`).then(res => res.data);
export const getMovieCredits = (id) => api.get(`/mv_credit?id=${id}`).then(res => res.data);
export const getMovieCertification = (id) => api.get(`/mv_certification?id=${id}`).then(res => res.data);
export const getDownload=(url)=>api.get(`/download?url=${url}`).then(res=>res.data);
export const getMovieTrending=(time)=>api.get(`/mv_trending?time=${time}`).then(res=>res.data); //type= day or week
export const getPopular=(type)=>api.get(`/popular?type=${type}`).then(res=>res.data);//type= movie or tv
export const getMovieUpcoming=()=>api.get(`mv_upcoming`).then(res=>res.data);
export const getTvEpUpcoming=()=>api.get(`/tv_ep_upcoming`).then(res=>res.data);
export const getType_Catergory=(type,catergory,page)=>api.get(`/type_cater?type=${type}&catergory=${catergory}&page=${page||1}`).then(res=>res.data);
export const getGenre=(type)=>api.get(`/genre?type=${type}`).then(res=>res.data);
export const getSearch=(keyword,page)=>api.get(`/search?keyword=${keyword}&page=${page || 1}`).then(res=>res.data);
export const getMovieMedia=(id,type)=>api.get(`/mv_media?id=${id}&mediaType=${type}`).then(res=>res.data);
export const getMovieRecommend=(id)=>api.get(`/mv_recommendation?id=${id}`).then (res=>res.data);
export const getKeyword=(id)=>api.get(`/mv_keyword?id=${id}`).then(res=>res.data);
