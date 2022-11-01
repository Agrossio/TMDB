const Sequelize = require('sequelize');
const db = require('../config/db')          // importo la conexion a la db

class Favorites extends Sequelize.Model { }

// Favorites Schema:
Favorites.init({
    mediaId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    mediaType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }

}, { sequelize: db, modelName: 'favorites' })

module.exports = Favorites

