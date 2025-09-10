import { createContext,useContext,useState,useEffect } from "react";

const AuthContext= createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const storedUser= localStorage.getItem("display_name");
        const storedToken= localStorage.getItem("token");

        if(storedToken&&storedUser){
            setUser({display_name:storedUser, token: storedToken});
        }
    },[]);

    const login =(display_name,token)=>{
        localStorage.setItem("display_name",display_name);
        localStorage.setItem("token",token);
        setUser({display_name,token});
    };

    const logout =()=>{
        localStorage.removeItem("display_name");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}