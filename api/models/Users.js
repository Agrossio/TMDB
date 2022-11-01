const Sequelize = require('sequelize');
const db = require('../config/db')          // importo la conexion a la db
const bcrypt = require('bcrypt')

class Users extends Sequelize.Model {       // declaramos la clase Users heredando todas las propiedades que vienen del modelo de Sequelize. De esta forma tenemos acceso a todos los metodos que tiene incluido el modelo de Sequelize

    // METODOS DE INSTANCIA:

    hashPass(plainPassword, salt) {         // creo el metodo de instancia para hashear los passwords

        return bcrypt.hash(plainPassword, salt) // uso el metodo hash de bcrypt que requiere un pasword (string) y un salt para hashear el password.
    }

    validatePassword(passwordToValidate) {

        return this.hashPass(passwordToValidate, this.salt)         // al ser un metodo de instancia, this es la instancia que llama a la funcion
            .then(hashedPassToValidate => hashedPassToValidate === this.password)   // comparo el hash generado con el pass del input contra el hash guardado en la base de datos, si es igual, retorna true, sino false.

    }

    toggleFavorite(mediaElementId, isFavorite) {

        //  console.log(this.dataValues, mediaElementId, isFavorite)


        if (!isFavorite) {
            this.dataValues.favorites.push(mediaElementId)
            //console.log(this.dataValues)
            return this
        } else {
            let index = this.dataValues.favorites.indexOf(mediaElementId)
            console.log("INDEX:", index)
            console.log("MEDIA ID:", mediaElementId)
            this.favorites.slice(index, 1)
            return this
        }

    }

}


// Users Schema:
Users.init({
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true,
    },
    password: {                                 // aca vamos a guardar la contraseña hasheada
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    /* favorites: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
        defaultValue: [],
    }, */
    salt: {                                     // es un string que vamos a usar para hashear el pass y luego para validarlo en cada login
        type: Sequelize.DataTypes.STRING
    }

}, { sequelize: db, modelName: 'users' })


// HOOKS:

Users.beforeCreate((user) => {              // antes de que se cree la instancia en la db, ejecuto la funcion anonima. User es la instancia que se esta creando

    const salt = bcrypt.genSaltSync()       // genero un salt con bcrypt

    user.salt = salt                        // guardo el salt dentro de la instancia user

    // hasheo el password pasando el plain password y el salt a hashedPass (pongo el return para que el hook espere a que se
    // termine de hashear y guardar la hashedPass dentro de la propiedad password de la instancia).

    return user.hashPass(user.password, salt)
        .then(hashedPass => user.password = hashedPass) // cuando termina de hashear guardo el hashedPassword y lo guardo en la instancia
})

module.exports = Users