import express from "express";
const router = express.Router();

import { registrar,
          autenticar, 
          confirmar,
          olvidePassword,
          comprobarToken, 
          nuevoPassword,
          perfil
      } from "../controllers/usuarioController.js";

 import checkAuth from "../middleware/checkAuth.js";


// Autenticación, registro y confirmación de usuarios 
router.post("/", registrar); //creando un nuevo usuario 
router.post("/login", autenticar); //autenticando 
router.get("/confirmar/:token", confirmar); //autenticando 
router.post("/olvide-password",olvidePassword); // contraseña olvidada 

// router.get("/olvide-password/:token",comprobarToken); //comprobar  si existe el usuario
// router.get("/olvide-password/:token", nuevoPassword); //recuperar password

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil);




export default router;
