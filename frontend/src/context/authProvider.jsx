import { useState,useEffect, createContext } from "react";
import {useNavigate} from "react-router-dom"
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
     const [auth, setAuth] = useState({})
     const [cargando,setCargando] = useState(true)

     const  navigate = useNavigate();
    
     useEffect(() => {
          const autenticarUsuario = async () => {
               const token  = localStorage.getItem('token')
               console.log(token)
               if(!token) {
                    setCargando(false)
                    return
               }

               const config = {
                    headers : {
                         "Content-Type" : "application/json",
                         Authorization : `Bearer ${token}`
                    }
               }

               try {
                    const {data} = await clienteAxios("/usuarios/perfil", config)
                 //   console.log(data)
                    setAuth(data)
                    navigate("/proyectos")
                    
               } catch (error) {
                    setAuth({})
                    console.log('aqui')
                    console.log(error)
               } finally {
                    setCargando(false)
               }
               

          }

          autenticarUsuario();
     }, []);

     return (
          <AuthContext.Provider
            value =  {{
               auth,
               setAuth,
               cargando
            }}
          >
               {children}
          </AuthContext.Provider>
     );

}

export {
     AuthProvider
}     

export default AuthContext;
