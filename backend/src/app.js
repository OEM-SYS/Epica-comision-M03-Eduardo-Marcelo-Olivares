import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
//AQUI LUEGO HAY QUE IMPORTAR LAS RUTAS
const app=express();
//que nunca falte esta linea para poder devolver resultados json
app.use(express.json()); 
// se utilizara para ver las peticiones del cliente desde el navegador en la terminal
app.use(morgan("tiny"));//"tiny" "dev" "common" y otros mas, devuelven mayor o menor informacion (ip, peticon, estado, duaracion )
// se utila Intercambio de recursos de origen cruzado(cors) para que permita 
//al servidor indicar cualquier dominio, esquema o puerto con un origen distinto 
//del suyo  desde el que un navegador debería permitir la carga de recursos 
//como como las imagenes entre otras cosas y para este proyecto en 
//paraticular(avatarUSER , imagenURL)
app.use(cors());
//cookieParser es un middleware de Express.js que se utiliza para analizar 
//y manejar las cookies que se envían desde el cliente hasta el servidor.
app.use(cookieParser());
////AQUI LUEGO HAY QUE USAR LAS RUTAS
//app se utilizara en src/index.js
export {app};