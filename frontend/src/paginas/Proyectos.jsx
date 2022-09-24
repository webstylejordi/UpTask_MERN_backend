 import useProyectos from "../hooks/useProyectos"
 import PreviewProyecto from "../components/PreviewProyecto"
 

const Proyectos = () => {

  const  {proyectos} = useProyectos()
 // console.log(proyectos)

  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
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
