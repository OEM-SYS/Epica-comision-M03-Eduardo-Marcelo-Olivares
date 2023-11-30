import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./database/db.js";
import {indexRoutes} from "./routes/index.routes.js";
import {router as authRouter} from "./routes/auth.routes.js";
import {router as postRouter} from "./routes/post.routes.js";
import {router as commentRouter} from "./routes/comment.routes.js";

const app=express();
//funcion asincrona que conecta la base de datos
connectDB();

//express.json() es una función de middleware integrada en Express. 
//Este método se utiliza para analizar las solicitudes entrantes con cargas JSON
//que nunca falte esta linea para poder recibir resultados json
app.use(express.json());

//Helmet ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas 
//mediante el establecimiento correcto de cabeceras HTTP.
app.use(helmet());

// se utilizara para ver las peticiones del cliente desde el navegador en la terminal
app.use(morgan("tiny"));//"tiny" "dev" "common" y otros mas, devuelven mayor o menor informacion (ip, peticion, estado, duaracion )

//cookieParser es un middleware de Express.js que se utiliza para analizar 
//y manejar las cookies que se envían desde el cliente hasta el servidor.
app.use(cookieParser());

//aqui se importan las rutas
app.use("/", indexRoutes);
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);


// se utila Intercambio de recursos de origen cruzado(cors) para que permita 
//al servidor indicar cualquier dominio, esquema o puerto con un origen distinto 
//del suyo  desde el que un navegador debería permitir la carga de recursos 
//como como las imagenes entre otras cosas y para este proyecto en 
//paraticular(avatarUSER , imagenURL)
app.use(cors());

//app se utilizara en src/index.js
export {app};

