//se importa el modelo de usuario
import User from "../models/user.model.js";
//se importa Bcrypt para la función de hashing de passwords
import bcrypt from "bcrypt";
import { createAccessToken } from '../middlewares/jwt.validator.js';

//Register
export const register = async (req, res) => {
  const { email, password, username , avatarURL} = req.body
  try {
    //aqui se define la cantidad de vueltas que se le dara al password
    //mas de 10 vueltas empieza a consumir mas recursos de servidor
    //se deja en valor 10 (podria colocarse en variables de entorno)
    const bcryptSaltRounds=10;
    const passwordHash = await bcrypt.hash(password, bcryptSaltRounds);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      avatarURL,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      avatarURL: userSaved.avatarURL,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(">>backend>>>>>>>>>>>>>>>", error.message);
    //res.status(500).json({ message: error.message });
    //res.status(500).json({ errors: [{ type: "server", msg: error.message }] });
    console.log(">>backend>>>>>error.code>>>>>>>>>>", error.code);
    switch(error.code){
      case 11000:
        return res.status(409).json({ errors: [{ type: "duplicate", msg: "The email is already registered" }] });
      default:
        return res.status(500).json({ errors: [{ type: "server", msg: error.message }] });
    }
  }
};

//Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    //console.log("src/controllers/auth.comtroler.js   dump req.body ",req.body);

    try {
      const userFound = await User.findOne({ email });
      if (!userFound)
        //return res.status(400).json({ message: "Unregistered User" });
        return res.status(400).json({ errors: [{ type: "notFound", msg: "Unregistered User" }] });
      const matchPassword = await bcrypt.compare(password, userFound.password);
      if (!matchPassword) {
        //return res.status(400).json({ message: "Incorrect Password", token: null });
        return res.status(400).json({ errors: [{ type: "notFound", msg: "Incorrect Password", token :null }] });
      } else {
        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token);
        res.json({
          message: "Welcome!",
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    } catch (error) {
     // console.log("src/controllers/auth.comtroler.js dump error catch ",error);
      //return res.status(500).json({ message: "Failed to Login", error });
      return res.status(500).json({ errors: [{ type: "server", msg: "Failed to Login" ,error }] });
    }
  };

  //Logout
  export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ message: "See you soon!" });
  };
  
  //Profile
  export const profile = async (req, res) => {
    try {
      const userFound = await User.findById(req.user.id);
      //console.log("src/controllers/auth.comtroler.js  profile dump userFound", userFound);
      if (!userFound)
        return res.status(400).json({ message: "User not Found" });
      res.json({
        message: "Perfil",
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      console.log("src/controllers/auth.comtroler.js   profile dump error en catch ",error);
      res.status(500).json({ message: "Error in Profile", error });
    }
  };
