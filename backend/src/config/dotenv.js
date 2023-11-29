import dotenv from "dotenv";
dotenv.config();
// settingsDotEnvPort se utilizara en src/index.js
// si falla la lectura de PORT , se devolvera el puerto 4040 por defecto
export const settingsDotEnvPort= ()=>{
    return {port:process.env.PORT || 4040};
};

//settingDotEnvDb se utilizara en src/database/db.js que apunta a la base de datos
//DB_HOST se utiliza para ATLAS y DB_LOCALHOST se utiliza para MONGO DB con COMPASS
export const settingDotEnvDb = () => {
    return {
      db: {
        host: process.env.DB_HOST, localhost: process.env.DB_LOCALHOST,
      },
    };
  };

//settingSecretToken se utilizara en 
//palabra secreta del token 
  export const settingSecretToken = () => {
    return { secret: process.env.SECRET };
  };

//settingTokenExpiresIn se utilizara en src/middlewares/jwt.validator.js
//tiempo de duracion del token 
export const settingTokenExpiresIn = () => {
  return { TokenExpires: process.env.TOKEN_EXPIRES_IN };
};