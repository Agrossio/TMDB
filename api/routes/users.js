const express = require('express')
const { generateToken, validateToken } = require('../config/tokens')
const validateSession = require('../middlewares/auth')
const { Favorites, Users } = require('../models')
const usersRouter = express.Router()

usersRouter.get('/', (req, res, next) => {

    Users.findAll()
        .then((usersArray) => res.send(usersArray))
        .catch(next)

})

usersRouter.post('/:userId/favorites/:mediaElementId/:isFavorite', (req, res, next) => {

    const { userId, mediaElementId } = req.params
    const isFavorite = req.body.isFavorite
    const mediaType = req.body.mediaType

    //  console.log(userId, mediaElementId, isFavorite)

    // findOrCreate Favorito (tiene la combinacion mediaId-userId esto evita favoritos repetidos)

    if (!isFavorite) {
        Favorites.findOrCreate({ where: { userId, "mediaId": mediaElementId, mediaType } })
            .then((createdFavorite) => res.send(true))
            .catch(next)
    } else {
        Favorites.destroy({ where: { userId, "mediaId": mediaElementId } })
            .then(() => res.send(false))
    }
})


// TERMINAR ESTA RUTA PARA QUE APAREZCAN LOS SWITCHS DE FAVORITOS SINCRONIZADOS CON LA DB:
usersRouter.get('/:userId/favorites/:mediaElementId', (req, res, next) => {

    const { userId, mediaElementId } = req.params

    console.log(userId, mediaElementId)

    Favorites.findOne({ where: { userId, "mediaId": mediaElementId } })
        .then(foundFavorite => {
            console.log(foundFavorite)
            // if (foundFavorite) {
            //     //console.log(foundFavorite)
            //     res.send(true)
            // } else { res.send(false) }
        })

})

usersRouter.post('/logout', (req, res, next) => {

    res.clearCookie('userToken')        // borro la cookie de nombre 'userToken'
    res.sendStatus(204)                 // 204: salio todo ok, no tengo nada que responder

})
/*
NO QUIERO BUSCAR UN USUARIO EN PARTICULAR
usersRouter.get('/:id', (req, res, next) => {

    const { id } = req.params

    console.log(`GET en /api/users/${id}`)

    Users.findByPk(id)
        .then((user) => res.send(user))
        .catch(next)

})
*/

usersRouter.post('/register', (req, res, next) => {

    Users.create(req.body)
        .then(createdUser => {
            // console.log("USER", createdUser)
            res.status(201).send(createdUser)
        })
        .catch(err => {
            console.log(err)
            // next()
            //if (err.parent.constraint) console.log("The email provided is already in use")
        })
})

usersRouter.post('/login', (req, res, next) => {

    /*
      1) obtener los datos del request
      2) obtener los datos del usuario (el usuario provee su mail y password)
      3) con el mail obtengo el salt de la base de datos
      4) con el password y el salt valido su contrateña
      5) si es incorrecta respondo con 401 (unauthorized)
      6) si es correcta genero un payload, genero un token, guardo el token en una cookie en el browser, respondo con el payload
      */

    const { email, password } = req.body

    // console.log(req.body)

    Users.findOne({ where: { 'email': email } })
        .then(user => {
            if (!user) return res.sendStatus(401)
            user.validatePassword(password)
                // los then estan uno dentro de otro para poder usar el user que retorno el findOne
                .then(isValid => {
                    if (!isValid) return res.sendStatus(401)
                    console.log("IS VALID", isValid)
                    const payload = {           // el payload debe ser info que sirva para identificar al usuario pero no debe tener informacion sensible como el hash, salt o SECRET. Puede ser mail, nombre de usario, rol/nivel de acceso, etc.
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName
                    }
                    const token = generateToken(payload)
                    res.cookie('userToken', token)      // 1er parametro: nombre que le ponemos a la cookie. 2do parametro: el contenido de la cookie

                    res.send(payload)

                })
        })

})

usersRouter.get('/profile', validateSession, (req, res, next) => {
    /*
        para acceder al perfil de usuario uso el middleware validateSession. El mismo incorpora en el req una
        propiedad user donde guarda los datos del usuario validado. Si la validacion falla, el middleware
        responde con un 401 y nunca se llega a responder con el user
    */

    res.send(req.user)
})

usersRouter.get('/me', validateSession, (req, res, next) => {        // la ruta puede ser "/me", "/checkauth", "/user".

    /*
    para acceder al perfil de usuario uso el middleware validateSession. El mismo incorpora en el req una
    propiedad user donde guarda los datos del usuario validado. Si la validacion falla, el middleware
    responde con un 401 y nunca se llega a responder con el user
    */

    res.send(req.user)                 // si es valido respondo con el usuario desencriptado del token en el middleware validateSession
})

usersRouter.put('/:id', (req, res, next) => {

    const { id } = req.params

    console.log(`PUT en /api/users/${id}`)

    // console.log(req.body)

    Users.update(req.body,
        {
            where: { id },
            returning: true,
            //  plain: true                 // hace que no retorne tanto arreglo (no me funciona)
        })
        .then(([updatedRows, updatedUsersArray]) => res.status(200).send(updatedUsersArray[0]))

})

usersRouter.delete('/:id', (req, res, next) => {

    const receivedId = req.params.id

    console.log(receivedId)

    Users.destroy({ where: { id: receivedId } })
        .then(() => res.sendStatus(202))
        .catch(next)
})

module.exports = usersRouter