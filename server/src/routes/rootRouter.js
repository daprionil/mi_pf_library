const express = require('express');
const { Book, Country, Category, User, Language, Review } = require('../db.js');

const rootRouter = express.Router();

rootRouter.get('/', async (req,res) => {
    //Get all Books
    const books = await Book.findAll({
        include:[{
            model:Country,
            as:'countryPublicationData'
        },{
            model:Category,
            through:{
                attributes:[]
            }
        },{
            model:Language,
            as:'languageBook',
            attributes:['language']
        },{
            model: Review
        }],
        attributes:{
            //exclude:['countryPublication','language']
        }
    },{});

    const book = books[0].dataValues;
    res.json(book);
});

rootRouter.get('/user',async (req,res) => {
    //? Find User Format
    const userFind = await User.findAll({
        include:[{
            model:Country,
            as:'countryUserData',
        },{
            //!Include Book in wichList User and get other includes for model Book
            model: Book,
            as:'wichListBook',
            include:[{
                model:Country,
                as:'countryPublicationData'
            },{
                model:Category,
                through:{
                    attributes:[]
                }
            },{
                model:Language,
                as:'languageBook',
                attributes:['language']
            }],
            through:{
                attributes:[]
            }
        },{
            model: Review
        }],
        attributes:{
            //exclude:['countryUser']
        }
    });
    const user = userFind[0].dataValues;
    res.json(user);
});

module.exports = rootRouter;