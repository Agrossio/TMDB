const Users = require('./Users')
const Favorites = require('./Favorites')

Favorites.belongsTo(Users)      // me crea la foreign key userId dentro de Favorites
// Users.hasOne(Favorites)      // para el alcance de este proyecto no hace falta tener Magic Methods en Users


module.exports = { Users, Favorites }