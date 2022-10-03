import Proyecto from "../models/proytecto.js"
import Tarea from "../models/Tarea.js"

const agregarTarea = async (req,res) => {
     const {proyecto} = req.body
     
     const existeProyecto = await Proyecto.findById(proyecto);
     

     if(!existeProyecto) {
          const error = new Error("El proyecto no existe");
          return res.status(404).json({msg : error.message})
     }

     if(existeProyecto.creador.toString() !==req.usuario._id.toString() ) {
          const error = new Error("No tienes los permisos para añadir tareas");
          return res.status(404).json({msg : error.message})
     }

     try {
          const tareaAlmacenada = await Tarea.create(req.body);
          //*almacenar el ID del proyecto
          existeProyecto.tareas.push(tareaAlmacenada._id);
          existeProyecto.save()
          res.json(tareaAlmacenada)
     } catch (error) {
          console.log(error)
     }
}

const obtenerTarea = async (req,res) => {
     const {id} = req.params;
     
     const tarea = await Tarea.findById(id).populate('proyecto')

     if(!tarea) {
          const error = new Error("tarea inexistente");
          return res.status(404).json({msg : error.message})
     }
     
     if(tarea.proyecto.creador.toString() !== req.usuario._id.toString ) {
          const error = new Error("Accion no valida");
          return res.status(403).json({msg : error.message})
     }
}

const actualizarTarea = async (req,res) => {
     const {id} = req.params;
     
     const tarea = await Tarea.findById(id).populate('proyecto')

     if(!tarea) {
          const error = new Error("tarea inexistente");
          return res.status(404).json({msg : error.message})
     }
     
     if(tarea.proyecto.creador.toString() !== req.usuario._id.toString() ) {
    
          const error = new Error("Accion no valida");
          return res.status(403).json({msg : error.message})
     }

     tarea.nombre = req.body.nombre || tarea.nombre;
     tarea.descripcion = req.body.descripcion || tarea.descripcion;
     tarea.prioridad = req.body.prioridad || tarea.prioridad;
     tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

     try {
          const tareaAlmacenada = await tarea.save();
          res.json(tareaAlmacenada)
     } catch (error) {
          console.log(error)
     }
}

const cambiarEstado = async (req,res) => {

}
  
const eliminarTarea = async (req,res) => {

     const {id} = req.params;
     
     const tarea = await Tarea.findById(id).populate('proyecto')

     if(!tarea) {
          const error = new Error("tarea inexistente");
          return res.status(404).json({msg : error.message})
     }
     
     if(tarea.proyecto.creador.toString() !== req.usuario._id.toString() ) {
         
          const error = new Error("Accion no valida");
          return res.status(403).json({msg : error.message})
     }

    
     try {
          await tarea.deleteOne();
          res.json({msg : 'La tarea se eliminó'})
       } catch (error) {
          console.log(error)
       }
       
}

export {
     agregarTarea,
     obtenerTarea,
     actualizarTarea,
     eliminarTarea,
     cambiarEstado
}