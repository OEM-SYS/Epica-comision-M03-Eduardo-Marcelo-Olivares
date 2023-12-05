import {createContext, useContext , useState} from "react";
import { registerRequest} from "../api/auth";
export const AuthContext=createContext();

export const useAuth = ()=>{
    const context= useContext(AuthContext);
    if(!context) 
    throw new Error ("Error en el contexto del usuario");
    return context;
};


export const AuthProvider = ({children})=>{
    const [user, setUser]= useState(null);
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    //aqui viene la registracion del usuario
    const signup = async (user) =>{
        try{
            const res= await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            console.log(error);
        }
    };

    return(
        <AuthContext.Provider value={{ signup, user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
        );
};