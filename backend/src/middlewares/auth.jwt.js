import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/dotenv.js";
//import userModel from "../models/user.model.js";
//import Role from "../models/Role.js";

const { secret } = settingSecretToken();

export const authRequired = (req, res, next) => {
  //console.log("src/middleware/auth.jwt.js dump req.headers.cookie",req.headers.cookie);
  //console.log("src/middleware/auth.jwt.js dump req.headers ", req.headers);
  const { token } = req.cookies;
  //   console.log("src/middleware/auth.jwt.js dump token",token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Authorization denied, no token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    // console.log("src/middleware/auth.jwt.js dump user ",user);
    req.user = user;
  });

  next();
};