import {FcGoogle} from "react-icons/fc";
import banner from "../../assets/backdrop2.jpg";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../components/authcontext/AuthContext";




const LoginPage=()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[errorMsg,setErrorMsg]=useState("");
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setErrorMsg("❌ Email không hợp lệ");
        return;
    }

    try{
        const res = await fetch("http://localhost:5000/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data= await res.json();
        if(res.ok){
            login(data.username,data.token);

            setErrorMsg("");
            setEmail("");
            setPassword("");

            navigate("/");
        }else{
            setErrorMsg(data.message||"Server error");
        }
    }
    catch(err){
        console.error(err);
        setErrorMsg("Server error");
    }
  };

  const handleGoogleLogin = () => {
    // 👉 Sau này tích hợp Firebase / OAuth2 ở đây
    console.log("🔐 Google login triggered");
  };


    return(
        <div className =" w-screen h-screen bg-center bg-cover flex items-center justify-center  " style={{backgroundImage:`url(${banner})`}}>

            <form onSubmit={handleLogin} className="w-96 h-auto flex flex-col gap-5 bg-white rounded-[30px] px-8 py-10">

                <div className="flex flex-col items-center mt-6">
                    <a href="/">
                        <img src={logo} className="w-44 h-auto"/>
                    </a>
                    
                    <h2 className="static font-sans text-left text-[16px] font-semibold mt-2">Welcome back!</h2>
                    
                </div>
                <div>
                    <label htmlFor="email" className="block text-[16px] font-normal text-gray-400 mb-1">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email address" onChange={(e)=>setEmail(e.target.value)} className="w-full h-11 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-100"></input>
                </div>
                <div>
                    <label htmlFor="password" className="block text-[16px] font-normal text-gray-400 mb-1">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} className="w-full h-11 border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-100"></input>
                </div>

                {errorMsg && (
                    <p className={`text-red-500 text-sm text-center -mt-2 transition-all duration-300 ${errorMsg ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        {errorMsg }
                    </p>)
                }

                <button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-3xl shadow-sm ">Login</button>

                <div className="flex items-center gap-4 my-4">
                    <hr className="flex-grow border-t border-gray-500 opacity-50 "/>
                    <span className="text-gray-400 font-[16px] whitespace-nowrap "> Continue with </span>
                    <hr className="flex-grow border-t border-gray-500 opacity-50 "/>
                </div>
                <button type="submit" onClick={handleGoogleLogin} className="w-full h-11 text-black font-semibold border border-gray-300 shadow-sm bg-white hover:bg-gray-200 rounded-lg flex  items-center justify-center gap-x-2">
                    <span className="text-sm font-medium text-gray-700">Login with Google</span>
                    <FcGoogle className="text-xl" />
                </button>
                <h4 className="static font-sans text-[16px] font-light text-center"> Don't have an account? <a href="/signup" className="text-blue-800 font-semibold">Register</a> </h4>
            
            </form>

        </div>
    );
}

export default LoginPage;