const express = require('express');
const { Book, Country, Category, Language, Review } = require('../db.js');

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
            model: Review,
            through:{
                attributes:[]
            }
        }],
        attributes:{
            exclude:['countryPublication','language']
        }
    },{});

    const book = books[0].dataValues;
    res.json(book);
});

module.exports = rootRouter;