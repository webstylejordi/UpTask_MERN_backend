import {Link} from 'react-router-dom'

const NuevoPassword = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
           Reestablece tu password y no pierdas acceso a 
            <span className="text-slate-700"> proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow-md rounded-lg p-10">
         

           <div className="p-5">
                <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password">
                     Nuevo Password </label>
                <input 
                     id="password"
                     type="password"
                     placeholder="Escribe tu password"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
           </div>
          

           <input
                type="submit"
                value="Guardar nuevo Password"
                className="bg-sky-700 w-full p-3 mb-5 text-white font-bold uppercase rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors "
           >
           </input>
      </form>

      <nav className="lg:flex lg:justify-between">
           <Link
                className='block my-5 text-center uppercase text-sm text-slate-500'
                to="/" 
                >¿Ya tienes una cuenta? Inicia Sesión
           </Link>
           <Link
                className='block my-5 text-center uppercase text-sm text-slate-500'
                to="/olvide-password" 
                >Olvidé mi password
           </Link>
      </nav>
 </>
  )
}

export default NuevoPassword
