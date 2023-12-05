import axios from "axios";
const APIBACKEND="http://localhost:3030/api";
export const registerRequest=(user)=>axios.post(`${APIBACKEND}/register`, user);//esta es la ruta de registrarse en el backend
