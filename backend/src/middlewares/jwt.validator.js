
//se importa para generar token de seguridad que nosotros creamos al momento
// que el usuario se registra con sus credenciales
import jwt from "jsonwebtoken";
import { settingSecretToken, settingTokenExpiresIn } from "../config/dotenv.js";
const {secret}=settingSecretToken();
const {TokenExpires}=settingTokenExpiresIn();

// esta funcion se utilizara en src/controllers/auth.controller.js
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    //console.log("scr/middlewares/jwt.validator.js ",settingTokenExpiresIn());
   // console.log("scr/middlewares/jwt.validator.js dump TokenExpires ",TokenExpires);
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: TokenExpires ,
      },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
}
