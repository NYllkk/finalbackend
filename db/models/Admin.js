const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require("../../sequlize")

const Admin = sequelize.define("Admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'Employee'),
        allowNull: false,
        defaultValue: 'ADMIN'
    }
})

module.exports = Admin



// Title
// File
// No file chosen
// Send To

// Select Project

// Summary
// Description


// Select Hours
// Priority

// Select Priority
