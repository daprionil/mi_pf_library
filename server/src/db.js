const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');

const relationsModels = require('./models/relationsModels');
const {DB_USER, DB_NAME, DB_PORT, DB_HOST, DB_PASSWORD} = process.env;

const gistDb = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize.Sequelize(gistDb,{logging:false});

//! Execute all models in './src/models/' with db 
const pathModels = path.join(__dirname + '/models/');

fs.readdirSync(pathModels).forEach((file) => {
    ///? exclude file relations by execute
    if(file === 'relationsModels.js') return;

    const pathFile = pathModels + file
    require(pathFile)(db);
});

//? execute relations
relationsModels(db);

module.exports = {
    db,
    ...db.models
}