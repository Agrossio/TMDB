const express = require('express')

const { Favorites, Users } = require('../models')
const favoritesRouter = express.Router()

favoritesRouter.get('/:userId', (req, res, next) => {

    const { userId } = req.params

    // console.log(userId)

    Favorites.findAll({ where: { userId } })
        .then((foundFavorites) => {
            // console.log(favorites)
            res.send(foundFavorites)
        })
        .catch(next)


})

module.exports = favoritesRouter