const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = require("../env");

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false
});

module.exports = db