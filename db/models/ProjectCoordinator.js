const { DataTypes } = require("sequelize");
const sequelize = require("../../sequlize")

const ProjectCoordinator = sequelize.define("ProjectCoordinator", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
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
        type: DataTypes.ENUM('ADMIN', 'Employee', 'ProjectCoordinator'),
        allowNull: false,
        defaultValue: 'ProjectCoordinator'
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },

});

module.exports = ProjectCoordinator;
