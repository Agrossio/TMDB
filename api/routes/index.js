const express = require('express')
const favoritesRouter = require('./favorites')
const usersRouter = require('./users')
const router = express.Router()

router.use('/users', usersRouter)
router.use('/favorites', favoritesRouter)

module.exports = router