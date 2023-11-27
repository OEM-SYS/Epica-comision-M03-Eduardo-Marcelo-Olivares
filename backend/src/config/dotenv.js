import dotenv from "dotenv";
dotenv.config();
// settingsDotEnvPort se utilizara en src/index.js
// si falla la lectura de PORT , se devolvera el puerto 4040 por defecto
export const settingsDotEnvPort= ()=>{
    return {port:process.env.PORT || 4040};
};