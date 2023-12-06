import {createContext, useContext , useState} from "react";
import { registerRequest, loginRequest} from "../api/auth";
export const AuthContext=createContext();

export const useAuth = ()=>{
    const context= useContext(AuthContext);
    if(!context) 
    throw new Error ("Error in user context");
    return context;
};


export const AuthProvider = ({children})=>{
    //usuario que podra ser leido en toda la aplicacion (register, login)
    const [user, setUser]= useState(null);
    //agregamos un booleano para saber si esta autenticado o no
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    //para capturar los errores declaro el use state como arreglo vacio, ya que pueden haber varios errores
    const [errors , setErrors]=useState([]);
    //aqui viene la registracion del usuario
    const signup = async (user) =>{
        try{
            const res= await registerRequest(user);
            console.log(res.data);
            //se asignan los datos en user
            setUser(res.data);
            //se dice que el usuario esta autenticado
            setIsAuthenticated(true);
        }catch(error){
            console.log(error.response);
            //guardamos el error para poder llevarlo al AuthContext para quee este disponible tambien
            setErrors(error.response.data);
        }
    };
    //aqui viene el login del usuario
    const signin = async (user) =>{
        try{
            const res= await loginRequest(user);
            console.log(res.data);
            //se asignan los datos en user
            setUser(res.data);
            //se dice que el usuario esta autenticado
            setIsAuthenticated(true);
        }catch(error){
            console.log(error.response);
            //guardamos el error para poder llevarlo al AuthContext para quee este disponible tambien
            setErrors(error.response.data);
        }
    };

    //En este contexto, todos los componentes que estan dentro (signup signin user isAuthenticated errors) 
    //se exportan para que esten disponibles en toda la aplicacion
    return(
        <AuthContext.Provider value={{ signup, signin ,user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
        );
};