const { validateToken } = require('../config/tokens')

function validateSession(req, res, next) {

    const token = req.cookies.userToken             // obtengo el token desde req.cookies
    if (!token) return res.sendStatus(401)          // sino hay token respondo con status 401

    const { user } = validateToken(token)           // si el token es valido retorna el tokenPayload, guardo en la variable user la propiedad user del tokenPayload
    if (!user) return res.sendStatus(401)           // sino es valido respondo con status 401

    req.user = user                                 // guardo dentro del req una propiedad user que va a tener el contenido del usuario validado

    next()                                          // llamo a next para que siga al siguiente middleware
}


module.exports = validateSession