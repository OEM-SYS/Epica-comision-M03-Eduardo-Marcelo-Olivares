//import axios from "axios";
import axios from "./setCredentials";//renombro credentials por axios

//const APIBACKEND="http://localhost:3030/api";

//esta es la ruta en el backend para registrarse
//export const registerRequest=async(user)=>axios.post(`${APIBACKEND}/register`, user);
export const registerRequest=async(user)=>axios.post(`/register`, user);

//esta es la ruta en el backend para loguearse
//export const loginRequest= async(user)=>axios.post(`${APIBACKEND}/login`, user);
export const loginRequest= async(user)=>axios.post(`/login`, user);

//verificar el token desde el backend
export const verifyToken = ()=>axios.get("/verifyToken");
