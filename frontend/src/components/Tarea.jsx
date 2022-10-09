import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin";


 
const Tarea = ({tarea}) => {

     const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos();
     const admin = useAdmin();



     const {descripcion, nombre, prioridad, fechaEntrega, _id, estado} = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">
          <div className="flex flex-col items-start">
               <p className="mb-1 text-xl font-bold uppercase">{nombre}</p>
               <p className="mb-1 text-xl text-gray-500 uppercase">{descripcion}</p>
               <p className="mb-1 text-xl font-bold">{formatearFecha(fechaEntrega)}</p>
               <p className="mb-1 text-xl text-gray-600">Prioridad : {prioridad}</p>
               {estado && <p className="text-xs p-1 rounded-lg text-white bg-green-600">
                    Completada por {tarea.completado.nombre} 
                    </p>}
          </div>

          <div className="flex flex-col lg:flex-row gap-2">

               {admin && (
                    <button
                         className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm"
                         onClick={() => handleModalEditarTarea(tarea) }
                    >Editar</button>
               )}
               

               <button
               className={`${estado ? "bg-sky-600" : "bg-gray-500"} px-4 py-3
                text-white uppercase font-bold rounded-lg text-sm`}
                  onClick={() => completarTarea(_id)}
                    >{estado ? 'completa' : 'incompleta'}</button>

               {admin && (
                     <button
                     className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm"
                     onClick={() => handleModalEliminarTarea(tarea)}
                    >Eliminar</button>
               )}
                   

          </div>

    </div>
  )
}

export default Tarea