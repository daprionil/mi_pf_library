const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Selling',{
        IdSelling:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        IdProducto:{
            type: DataTypes.UUID,
            allowNull: false,
            validate:{
                isUUID:true
            }
        },
        IdSellingTotal:{
            type: DataTypes.UUID,
            allowNull: false,
            validate:{
                isUUID:true
            }
        }
    },{timestamps:false});
};