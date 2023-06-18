module.exports = async function(database){
    const {Book, Category, Country, Review, Language} = database.models;
    
    //! Book
    //? Book 1Countries -> Country NBooks
    Country.hasOne(Book, {as:'countryPublicationData',foreignKey:'countryPublication'});
    Book.belongsTo(Country, {as:'countryPublicationData',foreignKey:'countryPublication'});    

    //? Book NCategories -> Category NBooks
    Book.belongsToMany(Category, {through: 'BookCategory',timestamps:false});
    Category.belongsToMany(Book,{through: 'BookCategory',timestamps:false});

    //? Book 1Language -> Language NBooks
    Book.belongsTo(Language, {foreignKey:'language',as:'languageBook'});
    Language.hasOne(Book,{foreignKey:'language',as:'languageBook'});

    //? Book NReviews -> Review NBooks
    Book.belongsToMany(Review, {through: 'BookReviews',timestamps:false});
    Review.belongsToMany(Book,{through: 'BookReviews',timestamps:false});
};