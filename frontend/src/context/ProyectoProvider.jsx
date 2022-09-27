import {useState, useEffect, createContext} from "react"
import clienteAxios from "../config/clienteAxios"
import {useNavigate} from "react-router-dom"

const ProyectosContext  = createContext();

const ProyectosProvider = ({children}) => {

     const [proyectos, setProyectos] = useState([]);
     const [alerta, setAlerta] = useState( {});    
     const [proyecto, setProyecto] = useState({}); 
     const [cargando, setCargando] = useState(false);
     const [modalFormularioTarea, setModalFormularioTarea] = useState(false);


     const navigate = useNavigate();
          

     useEffect(() => {
          const obtenerProyectos = async () => {
            

               try {
                    const token = localStorage.getItem('token')

                         if (!token) return 

                    const config =  {
                         headers: {
                              "Content-Type" : "application/json",
                              Authorization : `Bearer ${token}`
                         }
                    }

                    const {data} = await clienteAxios("/proyectos", config);
                    setProyectos(data)
                    
               } catch (error) {
                    console.log(error)
                         
               } 
          }
          obtenerProyectos();
     }, []);


     const mostrarAlerta = alerta => {
          setAlerta(alerta)

          setTimeout(() =>{
               setAlerta({})
          },3000)
     }

     const submitProyecto =  async proyecto => {
          if(proyecto.id) {
            await editarProyecto(proyecto)
          } else {
            await nuevoProyecto(proyecto)
          }
          return      
     }

     const editarProyecto = async proyecto => {
          try {
               const token = localStorage.getItem('token')

               if (!token) return 
          
               const config =  {
                    headers: {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }

               const  { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

               //*sincronizar el estate
               
               const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id ===data._id ?data : proyectoState ) 
               setProyectos(proyectosActualizados)

               //* actualizar alerta

               setAlerta({
                    msg: "proyecto actualizado correctamente",
                    error : false
               })

               //* redirecionar 
               
               setTimeout(() => {
                    setAlerta({})
                    navigate("/proyectos")
               },3000)

           

             //  console.log(data)
          } catch (error) {
               console.log(error)
          }

          

     }

     const nuevoProyecto = async proyecto => {
          try {
               const token = localStorage.getItem('token')
               if (!token) return 
                
               const config =  {
                    headers: {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }

               const {data} = await clienteAxios.post('/proyectos', proyecto, config)
                    setProyectos( [proyectos,...data])

                    setAlerta({
                         msg: "proyecto creado correctamente",
                         error : false
                    })

                    setTimeout(() => {
                         setAlerta({})
                         navigate("/proyectos")
                    },3000)

          } catch (error) {
               console.log(error)
               
          }
     }

     const obtenerProyecto = async id => {
          setCargando(true)
          try {
               const token = localStorage.getItem('token')

               if (!token) return 
                

               const config =  {
                    headers: {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }

               const {data} = await clienteAxios(`/proyectos/${id}`, config)
               setProyecto(data)
               
          } catch (error) {
               console.log(error)
          }  finally {
               setCargando(false)
          }
     }

     const eliminarProyecto = async id => {
          const token = localStorage.getItem('token')

          try {
               if (!token) return 
                
               const config =  {
                    headers: {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }

               const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)

               const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id != id) 

               setProyectos(proyectosActualizados)
               
               setAlerta({
                    msg: data.msg,
                    error : false
               })


               setTimeout(() => {
                    setAlerta({})
                    navigate("/proyectos")
               },3000)
               
          } catch (error) {
               console.log(error)
          }
     }

     //* tareas ***************************************************************************************************

     const handleModalTarea = () => {
          setModalFormularioTarea(!modalFormularioTarea)
     }

     const submitTarea = async tarea => {

          const token = localStorage.getItem('token')
           try {
               if (!token) return 
                
               const config =  {
                    headers: {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }
               const {data} = await clienteAxios.post('/tareas', tarea, config)
             
               //* agregar tarea al state 
               const proyectoActualizado = {...proyecto}
               proyectoActualizado.tareas =[...proyecto.tareas, data]

               setAlerta({});
               setModalFormularioTarea(false)

               setProyecto(proyectoActualizado)
           } catch (error) {
               console.log(error)
           }
     }




     return (
          <ProyectosContext.Provider
               value = {{
                    proyectos,
                    proyecto,
                    submitProyecto,
                    obtenerProyecto,
                    eliminarProyecto,
                    mostrarAlerta,
                    alerta,
                    cargando,
                    modalFormularioTarea,
                    handleModalTarea,
                    submitTarea
               }}
          >{children}
          </ProyectosContext.Provider>
        
     )
}

export {
     ProyectosProvider
}

export default ProyectosContext