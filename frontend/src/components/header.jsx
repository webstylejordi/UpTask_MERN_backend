 import {Link} from "react-router-dom"
 import useProyectos from "../hooks/useProyectos"
 import Busqueda from "./Busqueda";
const Header = () => {
  const {handleBuscador} = useProyectos();



  return (
       <header className="px-4 py-5 bg-white border-b flex-col md:flex-row">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
              Up Task
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              type="button"
              className="font-bold uppercase"
              onClick={handleBuscador}
            >buscar proyectos</button>

            
              <Link 
                to="/proyectos"
                className="font-bold uppercase"
              > Proyectos </Link>

              <button
              className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold "
                type="button"
              >Cerrar Sesion</button>

              <Busqueda />
            </div>
        </div>
    </header>
 
 
  )
}

export default Header