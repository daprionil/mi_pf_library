const generatedUUID = require('../utils/generateIdUUID.js');
const { DataTypes } = require('sequelize');

module.exports = function(database){
    database.define('Book', {
        IdBook:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            set(value){
                //! Clear THIS validation
                this.setDataValue('IdBook',value ? value : generatedUUID());
            },
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[2-50],
                notNull:{
                    msg:'The title cannot be empty'
                }
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        language:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isNumeric: true,
                min:1
            }
        },
        writers:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            validate:{
                notEmpty:true,
                len:[2]
            }
        },
        datePublication:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                isDate: true,
                isBefore: new Date().toISOString()
            }
        },
        countryPublication:{//HIDE IN VIEW
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isNumeric: true,
                min:1
            }
        },
        publisher:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                min:2,
                notEmpty: true,
            }
        },
        numberPages:{
            type: DataTypes.INTEGER,
            defaultValue:1,
            allowNull: false,
            validate:{
                min:1,
                notEmpty: true
            },
        },
        rate:{//VIRTUAL
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            validate:{
                min: 0.0,
                max:5.0,
                notEmpty:true,
            }
        },
        reviews:{
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
            validate:{
                isUUID: 4,
                notEmpty:true,
            }
        },
        sellings:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull:false,
            validate:{
                isNumeric: true,
                notEmpty:true,
            }
        }
    },{timestamps: false});
};