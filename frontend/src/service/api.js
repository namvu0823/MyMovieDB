import axios from "axios";

const api=axios.create({
    baseURL:"https://mymoviedb-production.up.railway.app:8080",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
})

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