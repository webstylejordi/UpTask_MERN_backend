import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from '../components/Alerta'
 

const Proyectos = () => {

  const  {proyectos, alerta} = useProyectos()

  const {msg} = alerta

  


  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>

      {msg && <Alerta alerta={alerta} /> }
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length  ?
              proyectos.map(proyecto => (
                <PreviewProyecto
                  key = {proyecto._id}
                  proyecto = {proyecto}
                />
              ))  :
            <p className="text-center uppercase text-gray-600 p-5">no hay proyectos  aún</p>
         }
       
      </div>
    </>
 
  )
}

export default Proyectos
