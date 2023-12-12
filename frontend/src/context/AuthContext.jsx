import {createContext, useContext , useEffect, useState} from "react";
import { registerRequest, loginRequest, verifyToken, findUserById} from "../api/auth";
import Cookies from "js-cookie";

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
            

            //almacenamiento en el localstore
            //localStorage.setItem("token",res.data.message);
            console.log(">>>>>>>>>>registrando usuario nuevo>>>>>>>>",res.cookie);

            
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
            //almacenamiento en el localstore
            localStorage.setItem("token",res.data.message);
        }catch(error){
            console.log(error.response);
            //guardamos el error para poder llevarlo al AuthContext para quee este disponible tambien
            setErrors(error.response.data);
        }
    };

    //aqui va el logout del usuario
    const signout = async () => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    //Buscar User por Id
    const getUsertById = async (id) => {
        try {
        const res = await findUserById(id);
        // console.log(res);
        //retornamos para que lo pueda ver el Usuario donde se necesite
        return res.data;
        } catch (error) {
        console.log("}}}}}}}}}}}}}}}}}}",error);
        }
    };

//al pasar 4 segundos se borran los errores 
useEffect(()=>{
    try{
        if(errors.errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            },4000);
            return ()=>clearTimeout(timer);
        }
    }
    catch(err){
        //console.log("?????authContext.jsx?????????no hay errores?",errors);
    }
   
},[errors]);

//manejo de cookies
useEffect(()=>{
    async function verifyLogin(){
        const cookie=Cookies.get();
        //console.log(">>>>>mostrando cookies>>>>>>",cookie);
        //console.log(">>>>>mostrando cookies token>>>>>>",cookie.token);

        if(cookie.token){
            try{
                const res =await verifyToken(cookie.token);//verificar en el backend el cookie.token
                console.log("resultado de verificar el token en el backend ", res);
                
                if(res.data){
                    setIsAuthenticated(true);
                    setUser(res.data);
                }else{
                    setIsAuthenticated(false);
                }
            }catch(error){
                console.log("error al intentar verificar token en el backend ", error);
                setIsAuthenticated(false);
                setUser(null);
            }
        }  

    }
    //llamo a la funcion para verificar el token en el backend
    verifyLogin();
},[]);

    //En este contexto, todos los componentes que estan dentro (signup signin user isAuthenticated errors) 
    //se exportan para que esten disponibles en toda la aplicacion
    return(
        <AuthContext.Provider value={{ signup, signin, signout ,user, isAuthenticated, errors, getUsertById }}>
            {children}
        </AuthContext.Provider>
        );
};
