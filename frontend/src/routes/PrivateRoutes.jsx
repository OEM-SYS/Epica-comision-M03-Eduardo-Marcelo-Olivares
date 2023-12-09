import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
export const PrivateRoutes = ()=>{
   // const{isAuth}=useAuth();
    //if(!isAuth) return <Navigate to ="/login"/>
    const{isAuthenticated}=useAuth();
    if(!isAuthenticated) return <Navigate to ="/login"/>

    return<Outlet/>;
}