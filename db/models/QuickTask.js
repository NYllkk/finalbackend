const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize")

const QuickTask = sequelize.define("QuickTask", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sendTo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project: {
        type: DataTypes.STRING,
        allowNull: true
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        allowNull: false,
        defaultValue: 'Medium'
    },
    // role: {
    //     type: DataTypes.ENUM('ADMIN', 'Employee', 'ProjectCordinator'),
    //     allowNull: false,
    //     defaultValue: 'ProjectCordinator'
    // }
})

module.exports = QuickTask



















