import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import ProyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();
 
 conectarDB();
 // configurar CORS 
 const whitelist = [process.env.FRONTEND_URL]

 const corsOptions  = {
     origin : function(origin,callback) {
          if(whitelist.includes(origin)) {
               //puede consultar la API 
               callback(null, true);
          } else {
               // no esta permitido 
               callback(new Error("Error de CORS"));
          };
     }
 }
app.use(cors(corsOptions));

 //Routing
 app.use("/api/usuarios", usuarioRoutes);
 app.use("/api/proyectos", ProyectoRoutes);
 app.use("/api/tareas", tareaRoutes);

 const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT, () => {
     console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//*socket io 
import { Server } from 'socket.io';

const io = new Server(servidor, {
     pingTimeout: 6000,
     cors: {
          origin: process.env.FRONTEND_URL,
     },
});

io.on("connection", (socket) => {
     console.log('se ha conectado a socket.io') 

     //*definir los eventos de socet io
     socket.on("abrir proyecto", (proyecto) =>{
         socket.join(proyecto);
     })

     socket.on("nueva tarea", (tarea) => {
          const proyecto = tarea.proyecto
          socket.to(proyecto).emit("tarea agregada", tarea)
     } )
    
     socket.on("eliminar tarea", tarea => {
          const proyecto = tarea.proyecto
          socket.to(proyecto).emit("tarea eliminada", tarea)
     })

     socket.on("actualizar tarea", (tarea) =>{
           const proyecto = tarea.proyecto._id
           socket.to(proyecto).emit("tarea actualizada", tarea)
     } )

     socket.on("cambiar estado", (tarea) => {
          const proyecto = tarea.proyecto._id
          socket.to(proyecto).emit("nuevo estado", tarea)
     })
})