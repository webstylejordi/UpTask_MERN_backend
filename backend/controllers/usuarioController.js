import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req,res) => {
     //evitar registros duplicados
     const {email} = req.body;

     const existeUsuario  = await Usuario.findOne( {email })

     if (existeUsuario) {
          const error = new Error('usuario ya regstrado ');
          return res.status(400).json({msg : error.message})
     }

     try {
          const usuario = new Usuario(req.body);
          usuario.token = generarId();
          const usuarioAmacenado = await usuario.save();
          res.json(usuarioAmacenado);

     } catch (error) {
          console.log(error);
     }
};
 
const autenticar  = async (req,res) => {
     const {email,password} = req.body;

     const usuario = await Usuario.findOne({email});
     
     //compobrar si el usuario existe
     if(!usuario) {
          const error = new Error('el usuario no existe');
          return res.status(404).json({msg: error.message})
     }

     //comprobar usuario confirmado
     if(!usuario.confirmado) {
          const error = new Error('tu cuenta no ha sido confirmada');
          return res.status(403).json({msg: error.message})
     }

     //comprobar passaword
     if(await usuario.comprobarPassword(password)) {
          res.json({
               _id: usuario._id,
               nombre: usuario.nombre,
               email: usuario.email,
               token: generarJWT(usuario._id,)
          })
     } else {
          const error = new Error('El PASSWORD ES INCORRECTO');
          return res.status(403).json({msg: error.message})
     }
};

const confirmar = async (req,res) =>  {
     const {token } = req.params;
     const usuarioConfirmar = await Usuario.findOne({token});

     if(!usuarioConfirmar) {
          const error = new Error('Token error, usuario no validado');
          return res.status(403).json({msg: error.message})
     }

     try {
          usuarioConfirmar.confirmado=true;
          usuarioConfirmar.token="";
          await usuarioConfirmar.save();
          res.json({ msg: "usuario confirmado correctamente"})
          
     } catch (error) {
          console.log(error);
     }
};

const olvidePassword = async (req,res) => {
     const {email} = req.body;

     const usuario  = await Usuario.findOne( {email })

     if(!usuario) {
          const error = new Error('el usuario no existe ni está registrado');
          return res.status(404).json({msg: error.message})
     }

     try {
          usuario.token = generarId();
          await usuario.save()
          res.json({ msg: "hemos enviado un email con las instrucciones"})
     } catch (error) {
          console.log(error)
     }
};

const comprobarToken = async (req,res) => {
     const {token} = req.params;
     const tokenValido = await Usuario.findOne({token});

     if (tokenValido) {
          res.json({msg : "token valido y el usario existe"})
     } else {
          const error = new Error('Token no valido');
          return res.status(404).json({msg: error.message})
     }
};

const nuevoPassword = async (req,res) => {
     const {token} = req.params;
     const {password} = req.body;

     const usuario = await Usuario.findOne({token});

     if (usuario) {
          usuario.password = password;
          usuario.token ="";
          try {
               await usuario.save();
               res.json({msg: "password modificado correctamente"})
          } catch (error) {
               console.log(error)
          }

     } else {
          console.log('TOKEN INCORRECTO')
     }
};

const perfil = async (req,res) => {
     
     const {usuario} = req
     res.json(usuario);
}


export { registrar, 
         autenticar,
         confirmar, 
         olvidePassword,
         comprobarToken, 
         nuevoPassword,
         perfil  
     };