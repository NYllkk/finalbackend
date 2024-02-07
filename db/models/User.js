const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../sequlize")

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
        // unique: true,
    },
    email: {
        type: DataTypes.STRING,
        // unique: true,
    },
    password: {
        type: DataTypes.STRING,
    }
},
    {

    });

module.exports = User;
