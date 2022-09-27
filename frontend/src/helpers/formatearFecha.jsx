export const formatearFecha = fecha => {
    // console.log(fecha.split('T')[0])
     
     const nuevaFecha = new Date(fecha)

     const opciones = {
          weekday: "long",
          year : "numeric",
          month : "long", 
          day : "numeric"
     }

     return nuevaFecha.toLocaleDateString("es-ES", opciones)
}