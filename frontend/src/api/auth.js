import axios from "axios";
const APIBACKEND="http://localhost:3030/api";
//esta es la ruta en el backend para registrarse
export const registerRequest=(user)=>axios.post(`${APIBACKEND}/register`, user);
//esta es la ruta en el backend para loguearse
export const loginRequest=(user)=>axios.post(`${APIBACKEND}/login`, user);
