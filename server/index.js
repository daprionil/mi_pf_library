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
const generateIdUUID = require('./src/utils/generateIdUUID.js');
const port = process.env.PORT || 4001;


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
        await db.sync({force:true});
        console.log('The connection to the Database is successful');

        //* Start server if the database conection was successful
        server.listen(port,async () => {
            console.log(`Servidor corriendo en el puerto: ${port}`);

            //Prueba
            const uid = generateIdUUID();
            const uid2 = generateIdUUID();

            const date = new Date();
            const datePublication = date.toISOString();
            const book = {
                IdBook: uid2,
                title:"El camino del ser",
                description:'EL mero exotiqueo',
                writers:['Jordan Peterson'],
                datePublication,
                countryPublication: 1,
                publisher: 'El Columpio',
                language:1,
                rate: 4.1,
                numberPages:1,
                reviews:[uid],
                sellings:[1],
                categories:[1]
            };

            await db.models.Country.create({
                country:"Colombia"
            });
            await db.models.Category.create({
                category:"Inpetu"
            });

            await db.models.Language.create({
                language:"Español"
            });
            
            await db.models.Review.create({
                IdReview: uid,
                IdBook: uid2,
                rate: 4.0,
                description:'El exotiqueo masimo'
            });

            //* Create one book
            const bookCreated = await db.models.Book.create(book);
            bookCreated.addCategory(book.categories);
            bookCreated.addReview(book.reviews);

            console.log(bookCreated.dataValues);
        });
    } catch ({message}) {
        console.log(message);
    };
})();