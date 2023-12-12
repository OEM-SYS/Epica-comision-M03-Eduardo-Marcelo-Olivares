import { Router } from "express";
//se hace la desestructuracion de los controladores
import {register, login, logout, profile, verifyToken, getUserByID} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/auth.jwt.js";
import { validateUser , handleValidationErrors , validateLogin} from "../middlewares/user.validation.js";

//router se utilizara en src/app.js con un alias  as authRouter
export const router = Router();

router.post('/register', validateUser , handleValidationErrors , register);
//router.post('/register' , register);
router.post('/login' , validateLogin, handleValidationErrors ,login);
//router.post('/login' ,login);
router.post('/logout', logout);
router.get('/profile', authRequired , profile);
//pedidos del frontend para verificar el token
router.get('/verifyToken', verifyToken);
//pedidos del frontend para recuperar datos del Usuario
router.get('/finduser/:id', getUserByID);
