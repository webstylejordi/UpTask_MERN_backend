import { useEffect, useState } from "react" 
import {Link, useParams} from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta.jsx"

const ConfirmarCuenta = () => {
  const [alerta,setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState({})

  const params = useParams();
  const {id} = params;

  useEffect(() =>{
    const confirmarCuenta = async () => {
      try {
           //TODO: mover hacia un clinte AXIOS
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const {data } = await axios(url)

        setAlerta({
          msg: data.msg,
          error:false
        })

        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta();
  }, [])

  const {msg} = alerta

  return (
    <>
         <h1 className="text-sky-600 font-black text-6xl capitalize">
           Comfirma tu cuenta y comienza a crear tus 
            <span className="text-slate-700"> proyectos</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {msg && <Alerta alerta= {alerta} />}

        {cuentaConfirmada && ( 
          <Link
            className='block my-5 text-center uppercase text-sm text-slate-500'
            to="/" 
          >Inicia Sesión
          </Link>

        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
