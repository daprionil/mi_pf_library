const fs = require('fs');
const path = require('path');
const {DB_USER, DB_NAME, DB_PORT, DB_HOST, DB_PASSWORD} = process.env;
const {Sequelize} = require('sequelize');

const gistDb = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize.Sequelize(gistDb,{logging:false});

//! Execute all models in './src/models/' with db 
const pathModels = path.join(__dirname + '/models/');

fs.readdirSync(pathModels).forEach((file) => {
    const pathFile = pathModels + file
    require(pathFile)(db);
});

module.exports = {
    db,
    ...db.models
}