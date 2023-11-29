import { Router } from "express"; 

//indexRoutes se utilizara en src/app.js
export const indexRoutes = Router(); 

indexRoutes.get("/", (req, res) => {
  res.send("src/routes/index.routes.js Pagina de inicio"); 
});