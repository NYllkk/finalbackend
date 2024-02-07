const { DataTypes, Sequelize, } = require("sequelize")
const sequelize = require("../../sequlize")
const Student = sequelize.define("Student", {
    firstName: {
        type: DataTypes.STRING,
        unique: true,
    },
    lastName: {
        type: DataTypes.STRING,
        unique: true,
    },
    rollNo: {
        type: DataTypes.INTEGER,
    },
    section: {
        type: DataTypes.STRING,
    },


})

module.exports = Student