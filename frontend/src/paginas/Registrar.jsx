import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import axios from "axios";
import { Url } from "url";

const Registrar = () => {
 
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({})
  
  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
       setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
       })
       return
    }
    if(password !== repetirPassword ) {
      setAlerta({
        msg: 'Los passowrds no son iguales',
        error: true
     })
     return
    }

    if(password.length < 6 ) {
      setAlerta({
        msg: 'el password debe contener como mínimo 6 caracteres',
        error: true
     })
     return
    }
    setAlerta({})

    //Crear el usuario en la API 
     try {
        const  {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
         {nombre, email, password}) ;
       
          setAlerta({
               msg : data.msg,
               error : false
          }) 
          setNombre('');
          setEmail('');
          setPassword('');
          setRepetirPassword('')

     } catch (error) {
          setAlerta({
               msg : error.response.data.msg,
               error : true
          })
     }
  }


  
  const {msg} = alerta
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">
               Crea tu cuenta y administra
                <span className="text-slate-700"> proyectos</span>
          </h1>
          {msg && <Alerta alerta={alerta} /> }

          <form className="my-10 bg-white shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
          >
              <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre">
                         nombre </label>
                    <input
                         id="nombre"
                         type="text"
                         placeholder="nombre para registrar"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={nombre}
                         onChange= {e => setNombre(e.target.value)}
                    />
               </div>

               <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email">
                         email </label>
                    <input 
                         id="email"
                         type="email"
                         placeholder="email de registro"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={email}
                         onChange= {e => setEmail(e.target.value)}
                    />
                    
               </div>

               <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password">
                         Password </label>
                    <input 
                         id="password"
                         type="password"
                         placeholder="password de registro"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={password}
                         onChange= {e => setPassword(e.target.value)}
                    />
                    
               </div>
               <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2">
                         Repite tu Password </label>
                    <input 
                         id="password2"
                         type="password"
                         placeholder="repite tu password"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={repetirPassword}
                         onChange= {e => setRepetirPassword(e.target.value)}
                    />
                    
               </div>

               <input
                    type="submit"
                    value="Crear Cuenta"
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

export default Registrar