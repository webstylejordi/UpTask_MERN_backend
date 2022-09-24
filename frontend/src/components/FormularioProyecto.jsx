import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta'

const FormularioProyecto = () => {
     const [id, setId] = useState(null);
     const [nombre, setNombre] = useState(''); 
     const [descripcion, setDescripcion] = useState(''); 
     const [fechaEntrega, setFechaEntrega] = useState(''); 
     const [cliente, setCliente] = useState(''); 


     const params = useParams();

     const {mostrarAlerta,alerta, submitProyecto, proyecto } = useProyectos();

     useEffect(() => {
          if (params.id && proyecto.nombre) {
               setId(proyecto._id)
               setNombre(proyecto.nombre)
               setDescripcion(proyecto.descripcion)
               setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
               setCliente(proyecto.cliente)
          }  
     }, [params]);

     const handleSubmit = async e => {
          e.preventDefault();

          if ([nombre,descripcion, fechaEntrega, cliente].includes('')) {
               mostrarAlerta({
                    msg: "todos los campos son obligatorios",
                    error: true
               })
               return ;
          }
          await submitProyecto({id, nombre, descripcion,fechaEntrega,cliente})

          setId(null)
          setNombre('');
          setDescripcion('')
          setFechaEntrega('')
          setCliente('')
     }

     //pasar los datos al provider 

     const {msg} = alerta;

  return (
     

    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
          onSubmit={handleSubmit}
    >
     {msg && <Alerta alerta={alerta} /> }

          <div className='mb-5'>
               <label 
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='nombre'
               >nombre proyecto</label>

               <input
                    id="nombre"
                    className='border-2 w-full rounded-md placeholder-gray-400 p-2 mt-2 '
                    placeholder='nombre del proyecto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
               >
               </input>
          </div>

          <div className='mb-5'>
               <label 
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='descripcion'
               >Descripción</label>

               <textarea
                    id="descripcion"
                    className='border-2 w-full rounded-md placeholder-gray-400 p-2 mt-2 '
                    placeholder='descripción del proyecto'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
               />
          </div>

          <div className='mb-5'>
               <label 
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='fecha-entrega'
               >Fecha de Entrega</label>

               <input
                    id="fecha-entrega"
                    className='border-2 w-full rounded-md placeholder-gray-400 p-2 mt-2 '
                    type="date"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
               >
               </input>
          </div>

          <div className='mb-5'>
               <label 
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='cliente'
               >nombre del cliente</label>

               <input
                    id="cliente"
                    className='border-2 w-full rounded-md placeholder-gray-400 p-2 mt-2 '
                    placeholder='nombre del cliente'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
               >
               </input>
          </div>

          <input 
               type="submit"
               value={ id ?  'actualizar proyecto'  :  'Crear Proyecto'}
               className='w-full bg-sky-600 text-white font-bold text-center
               hover:bg-sky-700 transition-colors p-3 rounded-md cursor-pointer'
          />


    </form>
  )
}

export default FormularioProyecto
