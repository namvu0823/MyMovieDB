import { createContext,useContext,useState,useEffect } from "react";

const AuthContext= createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const storedUser= localStorage.getItem("username");
        const storedToken= localStorage.getItem("token");

        if(storedToken&&storedUser){
            setUser({username:storedUser, token: storedToken});

        }
    },[]);

    const login =(username,token)=>{
        localStorage.setItem("username",username);
        localStorage.setItem("token",token);
        setUser({username,token});
    };

    const logout =()=>{
        localStorage.removeItem("username");
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