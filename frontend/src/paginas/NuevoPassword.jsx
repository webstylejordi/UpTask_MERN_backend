import {Link, useParams} from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from 'react'

import Alerta from '../components/Alerta'


const NuevoPassword = () => {
     
     const [password, setPassword] = useState('')
     const [tokenValido, setTokenValido ] = useState(false);
     const [alerta, setAlerta] = useState({})
     const [passwordModficicado, setPasswordModificiado] =useState(false)

     const params = useParams();
     const {token} = params

     useEffect(() => {
     const     comprobarToken = async () => {
               try {
                    //TODO: mover hacia un cliente axios 
                    await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
                    setTokenValido(true)

               } catch (error)   {
                    setAlerta({
                         msg: error.response.data.msg,
                         error : true
                    })
               }

          }
          comprobarToken()
     }, []);
  
    const handleSubmit = async e => {
          e.preventDefault()
          
          if (password.length < 6 ) {
               setAlerta({
                    msg: "el password debe ser mínimo de 6 caracteres",
                    error : true
               })
               
          }
          try {
               const url =  `http://localhost:4000/api/usuarios/olvide-password/${token}`
               const {data} = await axios.post(url,  {password} )
               
               setAlerta ({
                    msg :   data.msg,
                    error : false
               })
               setPasswordModificiado(true)
                    
          } catch (error) {
               setAlerta ({
                    msg : error.response.data.msg,
                    error : true 
               })
          }

     }
     const {msg} = alerta;

     return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
           Reestablece tu password y no pierdas acceso a 
            <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} /> }
    {tokenValido && (
       <form className="my-10 bg-white shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
       >
         
               <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password">
                         Nuevo Password </label>
                    <input 
                         id="password"
                         type="password"
                         placeholder="Escribe tu password"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={password}
                         onChange={e => setPassword(e.target.value)}
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
    )}

     {passwordModficicado && ( 
          <Link
            className='block my-5 text-center uppercase text-sm text-slate-500'
            to="/" 
          >Inicia Sesión
          </Link>
     )}
 </>
  )
}

export default NuevoPassword
