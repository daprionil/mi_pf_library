const { DataTypes } = require("sequelize")
const generateIdUUID = require("../utils/generateIdUUID")

module.exports = function(database){
    database.define('SellingTotal',{
        IdSellingTotal:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            set(){
                this.setDataValue('IdSellingTotal', generateIdUUID());
            }
        },
        IdUser:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        }
    },{
        timestamps:true,
        createdAt:true,
        updatedAt:false
    })
}