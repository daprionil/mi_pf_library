const {DB_USER, DB_NAME, DB_PORT, DB_HOST, DB_PASSWORD} = process.env;
const {Sequelize} = require('sequelize');

const gistDb = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize.Sequelize(gistDb,{logging:false});

//Models
//Relations

module.exports = {
    db,
    ...db.models
}