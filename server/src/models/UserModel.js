const { DataTypes } = require("sequelize")
const generateIdUUID = require("../utils/generateIdUUID")

module.exports = function(database){
    database.define('User',{
        IdUser:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            set(value){
                //! Clear THIS validation
                this.setDataValue('IdUser', generateIdUUID());
            }
        },
        name:{
            type: DataTypes.STRING(60),
            allowNull: false,
            validate:{
                notEmpty:true,
                len:[5,60]
            },
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            unique: true,
            validate:{
                isEmail: {
                    msg:'The value is not an Email'
                },
                len:[5,50],
                notNull:{
                    msg:'The value cannot be null'
                },
                notEmpty: true
            }
        },
        phoneNumber:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            validate:{
                max:13,
                isInt:true
            }
        },
        birthdate:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate:true,
                isBefore: new Date().toISOString()
            }
        },
        //Asociation with Selling model
        //Asociation with Book model
        image:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                //! Validate BEFORE info work flow with cloudinary
                isUrl: true
            }
        },
        countryUser:{//HIDE IN VIEW
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isNumeric: true,
                min:1
            }
        },
    })
}