const express = require('express');

//* to use process.env
require('dotenv').config();

//* Dependencies
const morgan = require('morgan');
const cors = require('cors');

//* Get DB from file
const {db} = require('./src/db.js');

//* Get data in local
const server = require('./src/server.js');
const rootRouter = require('./src/routes/rootRouter.js');
const port = process.env.PORT || 4001;
const generateIdUUID = require('./src/utils/generateIdUUID.js');

//! Middlewares
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(cors());


//* Routes
server.use('/',rootRouter);

//* This function will be start the server
(async function main(){
    try {
        //* try conect database
        await db.sync({alter:true});
        console.log('The connection to the Database is successful');

        //* Start server if the database conection was successful
        server.listen(port,() => {
            console.log(`Servidor corriendo en el puerto: ${port}`);
        });
    } catch ({message}) {
        console.log(message);
    };
})();