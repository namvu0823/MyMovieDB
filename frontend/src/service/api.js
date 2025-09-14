import axios from "axios";
const API_BASE = process.env.VITE_API_URL ;

const api=axios.create({
    baseURL:API_BASE,
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
})

console.log("Debug API_BASE:", API_BASE); 

api.interceptors.request.use(
   
    (config)=>{
        const token =localStorage.getItem("token");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (err)=>{
        console.error("Error",err.response?.data||err.message);
        return Promise.reject(err);
    }
)

api.interceptors.response.use(
    (res)=>res,
    (err)=>{
          console.error("Error",err.response?.data||err.message);
        return Promise.reject(err);
    }
)




export default api;