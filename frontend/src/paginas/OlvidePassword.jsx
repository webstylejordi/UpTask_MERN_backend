import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'
import clienteAxios from '../config/clienteAxios'

const OlvidePassword = () => {
     
     const [email, setEmail] = useState('')
     const [alerta, setAlerta] = useState({})

     const handleSubmit = async e  => {
          e.preventDefault();

          if(email === '' || email.length < 6 ) {
               setAlerta ({
                    msg : "el email es obligatorio",
                    error :  true
               });
          return 
          }
          
          try {
               
             //  const { data } = await axios.post(`${import.meta.VITE_BACKEND_URL}/api/usuarios/olvide-password`, {email})

               //  const { data } = await axios.post(`${import.meta.VITE_BACKEND_URL}/api/usuarios/olvide-password`, {email})

             const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email})
               
               setAlerta({
                    msg : data.msg,
                    error :  false
               })

          } catch (error) {
               setAlerta({
                    msg : error.response.data.msg,
                    error :  true
               })
          }
     }

     const {msg} = alerta;

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
           Recupera tu password y no pierdas
            <span className="text-slate-700"> proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta} /> }
      <form className="my-10 bg-white shadow-md rounded-lg p-10"
          onSubmit={handleSubmit }
           >

           <div className="p-5">
                <label className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email">
                     email </label>
                <input 
                     id="email"
                     type="email"
                     placeholder="enviar instrucciones"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                     value = {email}
                     onChange = { e => setEmail(e.target.value)}
                />
           </div>

            

           <input
                type="submit"
                value="enviar instrucciones"
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
                    to="/registrar" 
                    >¿No tienes una cuenta? Regístrate
               </Link>
      </nav>
 </>
  )
}

export default OlvidePassword
