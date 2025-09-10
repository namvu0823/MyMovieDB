import {FcGoogle} from "react-icons/fc";
import logo from "../../assets/logo.svg";
import { useState,useEffect } from "react";
import { getMovieTrending } from "../../service/tmdbApi";
import { postRegisterAccount } from "../../service/user";
const RegisterPage=()=>{

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirm_password,setConfirm_password]=useState("");
    const[errorMsg,setErrorMsg]=useState("");
    const[successMsg,setSuccessMsg]=useState("");
    const [banner,setBanner]=useState(null);
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const data=getMovieTrending("day");
                const random_Movie=data.results[Math.floor(Math.random()*data.results.length)];
                setBanner(random_Movie);
            }
            catch(err){
                console.error("Failed to fetch trending",err);
            }
        }

        fetchData();
    },[]);

    const handleResgister=async (e)=>{
        e.preventDefault();
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            setErrorMsg("Email không hợp lệ");
            setSuccessMsg("");
            return;
        }

        if(password.length<8){
            setErrorMsg("Mật khẩu yếu!");
            setSuccessMsg("");
            return;
        }
        if(password!==confirm_password){
            setErrorMsg("Yêu cầu xác nhận lại mật khẩu!");
            setSuccessMsg("");
            return;
        }


        try{
            const res= await postRegisterAccount({email,password});
            if(res.ok){
                setErrorMsg("");
                setSuccessMsg("Create account succesfully");
                setEmail("");
                setPassword("");
                setConfirm_password("");
            }else{
                setErrorMsg(res.message||"Error");
                setSuccessMsg("");
            }
        }catch(err){
            console.error(err);
            setErrorMsg("Server error");
            setSuccessMsg("");
        }

    };

    const handleGoogleRegister=()=>{
        console.log("Google register clicked");
    }


    return(
            <div class ="w-screen h-screen bg-center bg-cover flex items-center justify-center " style={banner ? {backgroundImage:`url(${IMAGE_BASE}${banner.backdrop_path})`}:{}}>
    
                <form onSubmit={handleResgister} class="w-96 h-auto  flex flex-col  gap-4 bg-white rounded-[30px] px-8 py-5 ">
                    <div class="flex flex-col items-center mt-6">
                        <a href="/">
                            <img src={logo} class="w-44 h-auto"/>
                        </a>
                        <h4 class="static font-sans text-left text-[16px] font-normal mt-2">Create an account</h4>
                    </div>
                    <div>
                        <label htmlFor="email" class="block text-[16px] font-normal text-gray-400 mb-1">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="Enter your email address" class="w-full h-11 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-100"></input>
                    </div>
                    <div>
                        <label htmlFor="password" class="block text-[16px] font-normal text-gray-400 mb-1">Password</label>
                        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="Enter your password" class="w-full h-11 border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-100"></input>
                    </div>
                    <div>
                        <label htmlFor="password" class="block text-[16px] font-normal text-gray-400 mb-1">Confirm Password</label>
                        <input type="password" id="confirm_password" value ={confirm_password} onChange={(e)=>setConfirm_password(e.target.value)} 
                        placeholder="Confirm Password" class="w-full h-11 border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-100"></input>
                    </div>
                    
                    <div className="min-h-[24px] text-center transition-all duration-300">
                        {errorMsg ? (
                            <p className="text-red-500 text-sm">{errorMsg}</p>
                        ) : (
                            successMsg && <p className="text-green-600 text-sm">{successMsg}</p>
                        )}
                    </div>

                    <button type="submit" class="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-3xl shadow-sm ">Create an account</button>
                    <h4 class="static font-sans text-[16px] font-light text-center"> Already have an account? <a href="/login" class="text-blue-800 font-semibold">Login</a></h4>

                    <div class="flex items-center gap-4 my-1">
                        <hr class="flex-grow border-t border-gray-500 opacity-50 "/>
                        <span class="text-gray-400 font-[16px] whitespace-nowrap "> Or </span>
                         <hr class="flex-grow border-t border-gray-500 opacity-50 "/>
                    </div>
                    <button type="submit" onClick={handleGoogleRegister} class="w-full h-11 text-black font-semibold border border-gray-300 shadow-sm bg-white hover:bg-gray-200 rounded-lg flex  items-center justify-center gap-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                        <FcGoogle className="text-xl" />
                    </button>
                    
                </form>
    
            </div>
        );

}

export default RegisterPage;