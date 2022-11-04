// Configuración del server

const express = require("express")
const db = require("./config/db")
const app = express()
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const { PORT } = require("./env")

require('./models/index')
// require('dotenv').config()

// const port = process.env.BACKEND_PORT
// MIDDLEWARES (cargan contenido en el req): 

// app.use(express.static("public"))   // Static middleware: sirve archivos estaticos dentro de la carpeta public

app.use(express.json())             // Parsing middleware: si el request viene como .json lo parsea y lo guarda dentro de req.body (antes de pasar por este middleware req.body no existe)
app.use(cookieParser())             // Cookie parser middleware: si el request viene con cookies, las parsea y las guarda dentro de req.cookies
app.use(morgan('tiny'))
app.use('/api', routes)             // Routes middleware: cualquier request que llegue a /api lo manda a routes

// app.use('/api', (req, res) => {     // sino encuentra la ruta dentro de /api responde con un error 404
//     res.sendStatus(404)
// })


// // error middleware -> https://expressjs.com/es/guide/error-handling.html
// // PROBAR ERRORES CON Y SIN ESTO A VER LA DIFERENCIA! 
// app.use((err, req, res, next) => {
//     console.log("ERROR", err)
//     res.status(500).send(err.message)
// })

db.sync({ force: false })
    .then(() => {
        console.log('DB Connected! :D')
        // console.log('PUERTO:', PORT)
        app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}!`))
    })