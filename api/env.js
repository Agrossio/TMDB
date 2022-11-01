require("dotenv").config();

module.exports = {
  DB_NAME: process.env.DATABASE_NAME, //nombre de la base de datos
  DB_USER: process.env.DATABASE_USER, //nombre de usuario de la psql o mySQL
  DB_PASSWORD: process.env.DATABASE_PASSWORD, //contraseña de usuario de la psql o mySQL
  DB_HOST: process.env.DATABASE_HOST, //HOST ej: localhost
  PORT: process.env.BACKEND_PORT, //PUERTO ej:3001
  SECRET: process.env.SESSION_SECRET_CODE, //contraseña para jwt
};