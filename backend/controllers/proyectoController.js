import Proyecto from "../models/proytecto.js"; 
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req,res) => {
     const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select('-tareas');
     res.json(proyectos)
}

const nuevoProyecto = async (req,res) => {
     const proyecto = new Proyecto(req.body);
     proyecto.creador = req.usuario._id;

     try {
          const proyectoAlmacenado = await proyecto.save();
          res.json(proyectoAlmacenado);
     } catch (error) {
          console.log(error)
     }
}

const obtenerProyecto = async (req,res) => {
     const {id} = req.params;
     
     const proyecto = await Proyecto.findById(id).populate('tareas');
  
     
       if(!proyecto) {
          const error = new Error('Proyecto no encontrado')
            return res.status(404).json({msg: error.message})
       }

       if (proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error('no tienes los permisos')
          return res.status(404).json({msg: error.message})
       };

      //obtener las tareas del proyecto
    // const tareas  = await  Tarea.find().where("proyecto").equals(proyecto._id);
      res.json(proyecto)

     };

   




const editarProyecto = async (req,res) => {
     const {id} = req.params;

     const proyecto = await Proyecto.findById(id);
      
     
       if(!proyecto) {
          const error = new Error('Proyecto no encontrado')
            return res.status(404).json({msg: error.message})
       }

       if (proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error('no tienes los permisos')
          return res.status(404).json({msg: error.message})
       };

       proyecto.nombre = req.body.nombre || proyecto.nombre  
       proyecto.descripcion = req.body.descripcion || proyecto.descripcion 
       proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega 
       proyecto.cliente = req.body.cliente || proyecto.cliente 

       try {
          const proyectoAlmacenado = await proyecto.save();
          res.json(proyectoAlmacenado)
       } catch (error) {
          console.log(error)
       }
}


const eliminarProyecto = async (req,res) => {
     const {id} = req.params;
     
     const proyecto = await Proyecto.findById(id);
    
     
       if(!proyecto) {
          const error = new Error('Proyecto no encontrado')
            return res.status(404).json({msg: error.message})
       }

       if (proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error('no tienes los permisos')
          return res.status(404).json({msg: error.message})
       };

       try {
          await proyecto.deleteOne();
          res.json({msg : "proyecto eliminado"})
       } catch (error) {
          console.log(error)
       }
}

const buscarColaborador = async (req,res) => {
  
    const {email} = req.body
    const usuario = await  Usuario.findOne({email}).select
    ('-confirmado -createdAt -password -token -updatedAt -__v')

   if(!usuario) {
      const error = new Error( "usuario no encontrado")
      return res.status(404).json({msg: error.message})
   }
   res.json(usuario)
}

const agregarColaborador = async (req,res) => {
   const proyecto = await Proyecto.findById(req.params.id)

   if(!proyecto) {
      const error = new Error("proyecto no encontrado");
      return res.status(404).json({ msg : error.message})
   }

   if(proyecto.creador.toString() !== req.usuario._id.toString() ) {
      const error = new Error("accion no valida");
      return res.status(404).json({ msg : error.message})
   }

   const {email} = req.body
   const usuario = await  Usuario.findOne({email}).select
   ('-confirmado -createdAt -password -token -updatedAt -__v')

  if(!usuario) {
     const error = new Error( "usuario no encontrado")
     return res.status(404).json({msg: error.message})
  } 

  //el colaborador no es el admin del proyecto
  if(proyecto.creador.toString() === usuario._id.toString()) {
      const error = new Error( "El creador del proyecto no puede ser colaborador")
      return res.status(404).json({msg: error.message})
  }

  //se comprueba que no se haya agregado anteriormnte 
  if(proyecto.colaboradores.includes(usuario._id)) {
   const error = new Error( "el usuario ya  pertenece al proyecto")
   return res.status(404).json({msg: error.message})
  }

  //si ha pasado todas las validacions previas 
  proyecto.colaboradores.push(usuario._id)
  await proyecto.save()
  res.json({msg: "Colaborador agregardo correctamente"})
}


const eliminarColaborador = async (req,res) => {
  
}

 


export {
          obtenerProyectos,
          nuevoProyecto,
          editarProyecto,
          eliminarProyecto,
          obtenerProyecto,
          buscarColaborador,
          agregarColaborador,
          eliminarColaborador
     }