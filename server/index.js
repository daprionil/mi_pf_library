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
            const uid3 = generateIdUUID();
            const uid4 = generateIdUUID();

            const date = new Date();
            const datePublication = date.toISOString();
            
            await db.models.Country.create({
                country:"Colombia"
            });
            await db.models.Category.create({
                category:"Inpetu"
            });
            
            await db.models.Language.create({
                language:"Español"
            });
            
            //* Create one book
            
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
                reviews:[uid,uid4],
                sellings:[1],
                categories:[1]
            };

            const bookCreated = await db.models.Book.create(book);
            bookCreated.addCategory(book.categories);

            //* Create one User
            const userCreated = await db.models.User.create({
                IdUser:uid3,
                name:'El pillo',
                email:'lasparodias60@gmail.com',
                phoneNumber:3189812911,
                birthdate: new Date('2003-06-29').toISOString(),
                image:'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
                countryUser:1,
                payMethod:JSON.stringify({
                    type:'credit_card',
                    credentials:'eso'
                })
            });
            
            //* Create Reviews
            await db.models.Review.create({
                IdReview: uid,
                IdBook: uid2,
                IdUser:uid3,
                rate: 4.0,
                description:'El exotiqueo masimo'
            });

            await db.models.Review.create({
                IdReview: uid4,
                IdBook: uid2,
                IdUser:uid3,
                rate: 3.0,
                description:'El Rincon DEL Exotiqueo'
            });
            
            //* Set values to models
            userCreated.addWichListBook(uid2);
        });
    } catch ({message}) {
        console.log(message);
    };
})();