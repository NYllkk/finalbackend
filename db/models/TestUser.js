const { DataTypes } = require("sequelize");
const sequelize = require("../../sequlize");


const testUser = sequelize.define("testUser", {
    userName: {
        type: DataTypes.STRING
    },
    LastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    profilePicture: {
        type: DataTypes.STRING
    }
})

module.exports = testUser