import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from '../hooks/useAuth'

const Login = () => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [alerta, setAlerta] = useState({});

     const  {setAuth} = useAuth();

     const navigate = useNavigate();

     const handleSubmit = async e => {
           e.preventDefault();

           if ([email, password].includes('')) {
               setAlerta ({
                    msg : 'Todos los campos son obligatorios',
                    error: true
               });
               return ;
           }

           try {
               const { data } = await clienteAxios.post('/usuarios/login', {email, password});
               setAlerta({})
               localStorage.setItem('token',data.token)   

             setAuth(data)
             navigate("/proyectos")

               
           } catch (error) {
              setAlerta({
               msg: error.response.data.msg,
               error : true
              })
               
           }
     }

     const {msg} = alerta;

  return (
     <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">
               Inicia sesion y administra tus 
                <span className="text-slate-700"> proyectos</span>
          </h1>

          {msg && <Alerta alerta={alerta} /> }

          <form className="my-10 bg-white shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
          >
               <div className="p-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email">
                         email </label>
                    <input 
                         id="email"
                         type="email"
                         placeholder="email de registro"
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value= {email}
                         onChange=  {e => setEmail(e.target.value)}
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
               <input
                    type="submit"
                    value="iniciar sesion"
                    className="bg-sky-700 w-full p-3 mb-5 text-white font-bold uppercase rounded
                    hover:cursor-pointer hover:bg-sky-800 transition-colors "
               >
               </input>
          </form>

          <nav className="lg:flex lg:justify-between">
               <Link
                    className='block my-5 text-center uppercase text-sm text-slate-500'
                    to="/registrar" 
                    >¿No tienes una cuenta? Regístrate
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

export default Login
