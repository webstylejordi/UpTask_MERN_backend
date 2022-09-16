import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
     const {nombre, email, token} = datos

    //TODO: mover hacia variables de entorno 
     const transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "6813754ef292bc",
            pass: "ca5bb004907d6b"
          }
        });

     //informacion del email :
     const info =  await  transport.sendMail({
          from : ' "UPTASK - Administrador de proyectos" <cuentas@uptask.com> ',
          to : email,
          subject : "UPTASK comprueba tu cuenta",
          text : "comprueba tu cuenta en UPTASK",
          html : `<p>Hola: ${nombre} comprueba tu cuenta en UPTASK</p> 
          <p>Tu cuenta está casi lista, solo debes comprobar en el siguiente enlace :  
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar cuenta </a>
           si tu no has creado esta cuenta puedes ignorar el mensaje</p>`
     })

}


export const emailOlvidePassword = async (datos) => {
     const {nombre, email, token} = datos

     const transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "6813754ef292bc",
            pass: "ca5bb004907d6b"
          }
        });

     //informacion del email :
    
  //informacion del email :
  const info =  await  transport.sendMail({
     from : ' "UPTASK - Administrador de proyectos" <cuentas@uptask.com> ',
     to : email,
     subject : "UPTASK Re-establece tu password",
     text : "re-establece tu password en UPTASK",
     html : `<p>Hola: ${nombre} has solicitado reestablecer tu password</p> 
     <p>Sigue el siguiente enlace para generar un nuevo password :  
     <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer password </a>
      si tu no has solicitado cambiar el password puedes ignorar el mensaje</p>`
})

}
