const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SESSION_SECRET_CODE

const generateToken = (userPayload) => {

    /* 
     el metodo de firma de jwt necesita (firmar un token es generarlo):
     1) un payload (contenido que queremos guardar), los headers, los setea automaticamente la libreria (salvo que le especifiquemos algo en particular)
     2) el SECRET (palabra clave asociada al servidor)
     3) Objeto opcional de opciones (usamos que expire en 2 horas)
     */

    const token = jwt.sign({ user: userPayload }, SECRET, { expiresIn: "1d" }) // retorna el token generado

    // (*) el 1er parametro lo paso asi para que cuando valide el payload pueda acceder (dentro de payload.user) a la info del usuario sin la info de cuando fue creado el token y cuando expira

    return token
}

const validateToken = (token) => {

    /*
        el metodo verify recibe un token y el SECRET y firma nuevamente el contenido. Si todo esta correcto,
        devuelve el payload (es como el proceso inverso al generateToken). Gracias a (*) si quiero acceder a la info del usuario
        la encuentro en payload.user
    */

    const payload = jwt.verify(token, SECRET)

    return payload

}


module.exports = { generateToken, validateToken }