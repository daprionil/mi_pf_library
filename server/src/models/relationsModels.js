module.exports = async function(database){
    const {Book, User, Category, Country, Review, Language} = database.models;
    
    //! Book
    //? Book 1Countries -> Country NBooks
    //* reference with countryPublication attribute in Book model
    Country.hasOne(Book, {as:'countryPublicationData',foreignKey:'countryPublication'});
    Book.belongsTo(Country, {as:'countryPublicationData',foreignKey:'countryPublication'});    

    //? Book NCategories -> Category NBooks
    //* Book.addCategory(ARRAY[CategoryId's]])
    Book.belongsToMany(Category, {through: 'BookCategory',timestamps:false});
    Category.belongsToMany(Book,{through: 'BookCategory',timestamps:false});

    //? Book 1Language -> Language NBooks
    //* reference with languageBook attribute in Book model
    Language.hasOne(Book,{foreignKey:'language',as:'languageBook'});
    Book.belongsTo(Language, {foreignKey:'language',as:'languageBook'});

    //? Book NReviews -> Review NBooks
    //* Book.addReview(ARRAY[ReviewId's]])
    Book.hasMany(Review, {foreignKey:'IdBook'});
    Review.belongsTo(Book,{foreignKey:'IdBook'});

    //!User
    //* reference with countryUser attribute in User model
    Country.hasOne(User,{as:'countryUserData',foreignKey: 'countryUser'});
    User.belongsTo(Country,{as:'countryUserData',foreignKey: 'countryUser'});

    //? User NBooks -> Book NUsers
    //* User.addWichListBook(ARRAY[bookId's]])
    User.belongsToMany(Book,{as:'wichListBook',through:'wichList', timestamps: false});
    Book.belongsToMany(User,{through:'wichList', timestamps: false});

    //! Review
    User.hasMany(Review,{foreignKey:'IdUser'});
    Review.belongsTo(User,{foreignKey:'IdUser'});
};